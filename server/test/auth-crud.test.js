const assert = require("node:assert/strict");
const http = require("node:http");
const { after, before, beforeEach, describe, it } = require("node:test");

process.env.JWT_SECRET = "test-only-secret-that-is-at-least-32-bytes-long";
process.env.JWT_EXPIRES_IN = "1h";

const app = require("../dist/app").default;
const pool = require("../dist/models/database").default;
const { assertJwtConfiguration } = require("../dist/utils/jwt");

let server;
let baseUrl;
let nextId;
const users = new Map();
const dreams = new Map();
const habits = new Map();

const createId = () => `00000000-0000-4000-8000-${String(nextId++).padStart(12, "0")}`;

const rows = (items) => ({ rows: items });

pool.query = async (sql, values = []) => {
  const query = sql.replace(/\s+/g, " ").trim();

  if (query.startsWith("SELECT * FROM users WHERE email = $1")) {
    const user = [...users.values()].find((item) => item.email === values[0]);
    return rows(user ? [user] : []);
  }
  if (query.startsWith("INSERT INTO users")) {
    const [email, password_hash, first_name, last_name, avatar_url] = values;
    if ([...users.values()].some((user) => user.email === email)) {
      const error = new Error("duplicate email");
      error.code = "23505";
      throw error;
    }
    const user = {
      id: createId(),
      email,
      password_hash,
      first_name,
      last_name,
      avatar_url,
      created_at: new Date().toISOString(),
    };
    users.set(user.id, user);
    return rows([user]);
  }
  if (
    query.startsWith("SELECT id, email, first_name, last_name, avatar_url, created_at, updated_at")
  ) {
    const user = users.get(values[0]);
    return rows(
      user
        ? [
            {
              id: user.id,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              avatar_url: user.avatar_url,
              created_at: user.created_at,
              updated_at: user.updated_at,
            },
          ]
        : [],
    );
  }
  if (query.startsWith("SELECT * FROM users WHERE id = $1")) {
    const user = users.get(values[0]);
    return rows(user ? [user] : []);
  }
  if (query.startsWith("UPDATE users SET password_hash")) {
    const [password_hash, id] = values;
    const user = users.get(id);
    if (!user) return { rowCount: 0, rows: [] };
    user.password_hash = password_hash;
    return { rowCount: 1, rows: [{ id }] };
  }
  if (query.startsWith("UPDATE users SET")) {
    const id = values[values.length - 1];
    const user = users.get(id);
    if (!user) return rows([]);
    const setters = query.match(/SET (.*), updated_at = CURRENT_TIMESTAMP WHERE/i)[1];
    for (const setter of setters.split(", ")) {
      const [, field, position] = setter.match(/(\w+) = \$(\d+)/);
      const value = values[Number(position) - 1];
      if (
        field === "email" &&
        [...users.values()].some((item) => item.email === value && item.id !== id)
      ) {
        const error = new Error("duplicate email");
        error.code = "23505";
        throw error;
      }
      user[field] = value;
    }
    return rows([
      {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: user.avatar_url,
        created_at: user.created_at,
        updated_at: new Date().toISOString(),
      },
    ]);
  }
  if (query.startsWith("SELECT * FROM dreams WHERE user_id = $1")) {
    return rows([...dreams.values()].filter((item) => item.user_id === values[0]));
  }
  if (query.startsWith("SELECT * FROM dreams WHERE id = $1 AND user_id = $2")) {
    const dream = dreams.get(values[0]);
    return rows(dream && dream.user_id === values[1] ? [dream] : []);
  }
  if (query.startsWith("SELECT * FROM plan_stages")) {
    return rows([]);
  }
  if (query.startsWith("SELECT ps.* FROM plan_stages ps")) {
    assert.match(query, /WHERE ps\.id = \$1 AND d\.user_id = \$2/);
    return rows([]);
  }
  if (query.startsWith("INSERT INTO dreams")) {
    const [user_id, title, description, target_date, image_url] = values;
    const dream = {
      id: createId(),
      user_id,
      title,
      description,
      target_date,
      image_url,
      dream_status: "active",
      plan_status: "draft",
      progress: 0,
      created_at: new Date().toISOString(),
    };
    dreams.set(dream.id, dream);
    return rows([dream]);
  }
  if (query.startsWith("UPDATE dreams SET")) {
    assert.match(query, /WHERE id = \$\d+ AND user_id = \$\d+ RETURNING \*/);
    const id = values[values.length - 2];
    const userId = values[values.length - 1];
    const dream = dreams.get(id);
    if (!dream || dream.user_id !== userId) return rows([]);
    const setters = query.match(/SET (.*), updated_at = CURRENT_TIMESTAMP WHERE/i)[1];
    for (const setter of setters.split(", ")) {
      const [, field, position] = setter.match(/(\w+) = \$(\d+)/);
      dream[field] = values[Number(position) - 1];
    }
    return rows([dream]);
  }
  if (query.startsWith("DELETE FROM dreams")) {
    assert.match(query, /WHERE id = \$1 AND user_id = \$2/);
    const dream = dreams.get(values[0]);
    if (!dream || dream.user_id !== values[1]) return { rowCount: 0, rows: [] };
    dreams.delete(dream.id);
    return { rowCount: 1, rows: [] };
  }
  if (query.startsWith("SELECT * FROM habits WHERE user_id = $1")) {
    return rows([...habits.values()].filter((item) => item.user_id === values[0]));
  }
  if (query.startsWith("SELECT * FROM habits WHERE id = $1 AND user_id = $2")) {
    const habit = habits.get(values[0]);
    return rows(habit && habit.user_id === values[1] ? [habit] : []);
  }
  if (query.startsWith("INSERT INTO habits")) {
    assert.match(query, /WHERE \$2::uuid IS NULL OR EXISTS/);
    const [user_id, dream_id, title, description, frequency] = values;
    if (dream_id && dreams.get(dream_id)?.user_id !== user_id) return rows([]);
    const habit = {
      id: createId(),
      user_id,
      dream_id,
      title,
      description,
      frequency,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    habits.set(habit.id, habit);
    return rows([habit]);
  }
  if (query.startsWith("UPDATE habits SET")) {
    assert.match(query, /WHERE id = \$\d+ AND user_id = \$\d+ RETURNING \*/);
    const id = values[values.length - 2];
    const userId = values[values.length - 1];
    const habit = habits.get(id);
    if (!habit || habit.user_id !== userId) return rows([]);
    const setters = query.match(/SET (.*), updated_at = CURRENT_TIMESTAMP WHERE/i)[1];
    for (const setter of setters.split(", ")) {
      const [, field, position] = setter.match(/(\w+) = \$(\d+)/);
      habit[field] = values[Number(position) - 1];
    }
    return rows([habit]);
  }
  if (query.startsWith("DELETE FROM habits")) {
    assert.match(query, /WHERE id = \$1 AND user_id = \$2/);
    const habit = habits.get(values[0]);
    if (!habit || habit.user_id !== values[1]) return { rowCount: 0, rows: [] };
    habits.delete(habit.id);
    return { rowCount: 1, rows: [] };
  }

  throw new Error(`Unexpected SQL in API test: ${query}`);
};

const request = async (path, { method = "GET", token, body } = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const text = await response.text();
  return {
    status: response.status,
    body: text
      ? response.headers.get("content-type")?.includes("application/json")
        ? JSON.parse(text)
        : text
      : undefined,
  };
};

const register = async (email) => {
  const response = await request("/api/auth/register", {
    method: "POST",
    body: { email, password: "correct-horse-42", first_name: "Test" },
  });
  assert.equal(response.status, 201);
  return response.body;
};

describe("Auth and owner-scoped CRUD API", () => {
  before(async () => {
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  });

  after(async () => {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  });

  beforeEach(() => {
    nextId = 1;
    users.clear();
    dreams.clear();
    habits.clear();
  });

  it("requires a sufficiently long JWT secret", () => {
    const secret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
    try {
      assert.throws(() => assertJwtConfiguration(), /JWT_SECRET must be configured/);
    } finally {
      process.env.JWT_SECRET = secret;
    }
  });

  it("registers without exposing the password hash and logs in", async () => {
    const registered = await request("/api/auth/register", {
      method: "POST",
      body: { email: "  ALICE@example.com ", password: "correct-horse-42" },
    });
    assert.equal(registered.status, 201);
    assert.equal(registered.body.user.email, "alice@example.com");
    assert.equal("password_hash" in registered.body.user, false);
    assert.notEqual(users.get(registered.body.user.id).password_hash, "correct-horse-42");

    const login = await request("/api/auth/login", {
      method: "POST",
      body: { email: "alice@example.com", password: "correct-horse-42" },
    });
    assert.equal(login.status, 200);
    assert.ok(login.body.token);
    assert.equal("password_hash" in login.body.user, false);

    const wrongPassword = await request("/api/auth/login", {
      method: "POST",
      body: { email: "alice@example.com", password: "incorrect-password" },
    });
    assert.equal(wrongPassword.status, 401);

    const duplicate = await request("/api/auth/register", {
      method: "POST",
      body: { email: "alice@example.com", password: "correct-horse-42" },
    });
    assert.equal(duplicate.status, 409);
  });

  it("rejects accounts that still have a legacy plaintext password", async () => {
    const id = createId();
    users.set(id, {
      id,
      email: "legacy@example.com",
      password_hash: "legacy-password-42",
    });

    const response = await request("/api/auth/login", {
      method: "POST",
      body: { email: "legacy@example.com", password: "legacy-password-42" },
    });

    assert.equal(response.status, 401);
    assert.equal(response.body.message, "Неверный email или пароль");
  });

  it("reads and updates the current profile and changes password securely", async () => {
    const account = await register("profile@example.com");

    assert.equal((await request("/api/users/me")).status, 401);
    const profile = await request("/api/users/me", { token: account.token });
    assert.equal(profile.status, 200);
    assert.equal(profile.body.id, account.user.id);
    assert.equal(profile.body.first_name, "Test");
    assert.equal("password_hash" in profile.body, false);

    const updated = await request("/api/users/me", {
      method: "PATCH",
      token: account.token,
      body: { first_name: "Анна", last_name: "Иванова", avatar_url: "https://example.com/a.png" },
    });
    assert.equal(updated.status, 200);
    assert.equal(updated.body.first_name, "Анна");
    assert.equal(updated.body.last_name, "Иванова");
    assert.equal(updated.body.avatar_url, "https://example.com/a.png");
    assert.equal("password_hash" in updated.body, false);

    const emailWithoutPassword = await request("/api/users/me", {
      method: "PATCH",
      token: account.token,
      body: { email: "new@example.com" },
    });
    assert.equal(emailWithoutPassword.status, 400);

    const emailWithWrongPassword = await request("/api/users/me", {
      method: "PATCH",
      token: account.token,
      body: { email: "new@example.com", current_password: "incorrect-password" },
    });
    assert.equal(emailWithWrongPassword.status, 401);

    const emailUpdated = await request("/api/users/me", {
      method: "PATCH",
      token: account.token,
      body: { email: "  NEW@example.com ", current_password: "correct-horse-42" },
    });
    assert.equal(emailUpdated.status, 200);
    assert.equal(emailUpdated.body.email, "new@example.com");

    await register("taken@example.com");
    const duplicateEmail = await request("/api/users/me", {
      method: "PATCH",
      token: account.token,
      body: { email: "taken@example.com", current_password: "correct-horse-42" },
    });
    assert.equal(duplicateEmail.status, 409);

    const wrongCurrentPassword = await request("/api/users/me/password", {
      method: "PATCH",
      token: account.token,
      body: { current_password: "incorrect-password", new_password: "new-password-123" },
    });
    assert.equal(wrongCurrentPassword.status, 401);

    const passwordChanged = await request("/api/users/me/password", {
      method: "PATCH",
      token: account.token,
      body: { current_password: "correct-horse-42", new_password: "new-password-123" },
    });
    assert.equal(passwordChanged.status, 200);

    const oldPasswordLogin = await request("/api/auth/login", {
      method: "POST",
      body: { email: "new@example.com", password: "correct-horse-42" },
    });
    assert.equal(oldPasswordLogin.status, 401);

    const newPasswordLogin = await request("/api/auth/login", {
      method: "POST",
      body: { email: "new@example.com", password: "new-password-123" },
    });
    assert.equal(newPasswordLogin.status, 200);
  });

  it("rejects requests without a valid token and removes public user routes", async () => {
    assert.equal((await request("/api/dreams")).status, 401);
    assert.equal((await request("/api/habits", { token: "invalid" })).status, 401);
    assert.equal(
      (
        await request("/api/dreams/00000000-0000-4000-8000-000000000099/stages", {
          method: "POST",
          body: { title: "stage" },
        })
      ).status,
      401,
    );
    const user = await register("plan-owner@example.com");
    assert.equal(
      (
        await request("/api/stages/00000000-0000-4000-8000-000000000099/tasks", {
          method: "POST",
          token: user.token,
          body: { title: "task" },
        })
      ).status,
      404,
    );
    assert.equal((await request("/api/users")).status, 401);
  });

  it("supports dream CRUD with partial updates and isolates records by owner", async () => {
    const alice = await register("alice@example.com");
    const bob = await register("bob@example.com");
    const created = await request("/api/dreams", {
      method: "POST",
      token: alice.token,
      body: { title: "Learn piano", description: "Practice", image_url: "cover.png" },
    });
    assert.equal(created.status, 201);

    const list = await request("/api/dreams", { token: alice.token });
    assert.equal(list.body.length, 1);
    assert.equal(
      (await request(`/api/dreams/${created.body.id}`, { token: alice.token })).status,
      200,
    );

    const updated = await request(`/api/dreams/${created.body.id}`, {
      method: "PUT",
      token: alice.token,
      body: { description: "Practice daily" },
    });
    assert.equal(updated.status, 200);
    assert.equal(updated.body.title, "Learn piano");
    assert.equal(updated.body.description, "Practice daily");
    assert.equal(updated.body.image_url, "cover.png");

    assert.equal((await request("/api/dreams", { token: bob.token })).body.length, 0);
    assert.equal(
      (await request(`/api/dreams/${created.body.id}`, { token: bob.token })).status,
      404,
    );
    assert.equal(
      (
        await request(`/api/dreams/${created.body.id}`, {
          method: "PUT",
          token: bob.token,
          body: { title: "Not yours" },
        })
      ).status,
      404,
    );
    assert.equal(
      (
        await request(`/api/dreams/${created.body.id}`, {
          method: "DELETE",
          token: bob.token,
        })
      ).status,
      404,
    );
    assert.equal(
      (
        await request(`/api/dreams/${created.body.id}`, {
          method: "DELETE",
          token: alice.token,
        })
      ).status,
      204,
    );
  });

  it("supports habit CRUD and prevents cross-user access and dream linking", async () => {
    const alice = await register("alice@example.com");
    const bob = await register("bob@example.com");
    const dream = await request("/api/dreams", {
      method: "POST",
      token: alice.token,
      body: { title: "Travel" },
    });
    const created = await request("/api/habits", {
      method: "POST",
      token: alice.token,
      body: {
        title: "Save money",
        description: "Weekly deposit",
        frequency: "weekly",
        dream_id: dream.body.id,
      },
    });
    assert.equal(created.status, 201);
    assert.equal((await request("/api/habits", { token: alice.token })).body.length, 1);
    assert.equal(
      (await request(`/api/habits/${created.body.id}`, { token: alice.token })).status,
      200,
    );

    const updated = await request(`/api/habits/${created.body.id}`, {
      method: "PUT",
      token: alice.token,
      body: { description: "Monthly deposit", frequency: "monthly", is_active: false },
    });
    assert.equal(updated.status, 200);
    assert.equal(updated.body.description, "Monthly deposit");
    assert.equal(updated.body.frequency, "monthly");
    assert.equal(updated.body.is_active, false);

    assert.equal((await request("/api/habits", { token: bob.token })).body.length, 0);
    assert.equal(
      (await request(`/api/habits/${created.body.id}`, { token: bob.token })).status,
      404,
    );
    assert.equal(
      (
        await request(`/api/habits/${created.body.id}`, {
          method: "PUT",
          token: bob.token,
          body: { title: "Not yours" },
        })
      ).status,
      404,
    );
    assert.equal(
      (
        await request(`/api/habits/${created.body.id}`, {
          method: "DELETE",
          token: bob.token,
        })
      ).status,
      404,
    );

    const invalidLink = await request("/api/habits", {
      method: "POST",
      token: bob.token,
      body: { title: "Invalid link", dream_id: dream.body.id },
    });
    assert.equal(invalidLink.status, 404);
    assert.equal(
      (
        await request(`/api/habits/${created.body.id}`, {
          method: "DELETE",
          token: alice.token,
        })
      ).status,
      204,
    );
  });
});

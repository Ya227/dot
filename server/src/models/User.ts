import pool from "./database";

export interface IUser {
  id: string;
  email: string;
  password_hash: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  subscription_status: string;
  ai_requests_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface IUserProfile {
  email?: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
}

export interface IUserPublicProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  static async create(
    email: string,
    passwordHash: string,
    profile: IUserProfile = {},
  ): Promise<IUser> {
    const query = `
      INSERT INTO users (email, password_hash, first_name, last_name, avatar_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      email,
      passwordHash,
      profile.first_name ?? null,
      profile.last_name ?? null,
      profile.avatar_url ?? null,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<IUser | undefined> {
    const query = `
      SELECT * FROM users
      WHERE email = $1;
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id: string): Promise<IUser | undefined> {
    const query = `
      SELECT * FROM users
      WHERE id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findProfileById(id: string): Promise<IUserPublicProfile | undefined> {
    const query = `
      SELECT id, email, first_name, last_name, avatar_url, created_at, updated_at
      FROM users
      WHERE id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updateProfile(
    id: string,
    data: IUserProfile,
  ): Promise<IUserPublicProfile | undefined> {
    const fields = ["email", "first_name", "last_name", "avatar_url"] as const;
    const values: unknown[] = [];
    const setters = fields.flatMap((field) => {
      if (!Object.prototype.hasOwnProperty.call(data, field) || data[field] === undefined) {
        return [];
      }
      values.push(data[field]);
      return [`${field} = $${values.length}`];
    });

    if (setters.length === 0) {
      return this.findProfileById(id);
    }

    values.push(id);
    const query = `
      UPDATE users
      SET ${setters.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${values.length}
      RETURNING id, email, first_name, last_name, avatar_url, created_at, updated_at;
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async updatePassword(id: string, passwordHash: string): Promise<boolean> {
    const query = `
      UPDATE users
      SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id;
    `;
    const result = await pool.query(query, [passwordHash, id]);
    return result.rowCount !== 0;
  }
}

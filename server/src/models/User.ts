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
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
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
}

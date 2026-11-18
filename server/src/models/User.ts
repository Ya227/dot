import pool from "./database";

export interface IUser {
  id: string;
  email: string;
  password_hash: string;
  first_name: string | null;
  last_name: string | null;
  subscription_status: string;
  ai_requests_count: number;
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  static async create(email: string, passwordHash: string): Promise<IUser> {
    const query = `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [email, passwordHash];
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

  static async getAll(): Promise<IUser[]> {
    const query = `
      SELECT * FROM users;
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}

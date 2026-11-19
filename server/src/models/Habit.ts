import pool from "./database";

export interface IHabit {
  id: string;
  user_id: string;
  dream_id: string | null;
  title: string;
  description: string | null;
  frequency: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class HabitModel {
  static async create(
    userId: string,
    title: string,
    frequency: string,
    dreamId?: string,
    description?: string,
  ): Promise<IHabit> {
    const query = `
      INSERT INTO habits (user_id, dream_id, title, description, frequency)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, dreamId, title, description, frequency]);
    return result.rows[0];
  }

  static async findByUserId(userId: string): Promise<IHabit[]> {
    const query = `
      SELECT * FROM habits 
      WHERE user_id = $1 AND is_active = TRUE 
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async findByDreamId(dreamId: string): Promise<IHabit[]> {
    const query = `
      SELECT * FROM habits 
      WHERE dream_id = $1 AND is_active = TRUE;
    `;
    const result = await pool.query(query, [dreamId]);
    return result.rows;
  }
}

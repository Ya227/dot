import pool from "./database";

export interface IDream {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  target_date: Date | null;
  is_ai_generated: boolean;
  dream_status: string;
  plan_status: string;
  progress: number;
  created_at: Date;
  updated_at: Date;
}

export class DreamModel {
  static async create(
    userId: string,
    title: string,
    description?: string,
    targetDate?: Date,
  ): Promise<IDream> {
    const query = `
      INSERT INTO dreams (user_id, title, description, target_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, title, description, targetDate]);
    return result.rows[0];
  }

  static async findByUserId(userId: string): Promise<IDream[]> {
    const query = `
      SELECT * FROM dreams 
      WHERE user_id = $1 
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async findById(id: string): Promise<IDream | undefined> {
    const query = `
      SELECT * FROM dreams 
      WHERE id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updateProgress(id: string, progress: number): Promise<void> {
    const query = `
      UPDATE dreams 
      SET progress = $1, 
      updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2;
    `;
    await pool.query(query, [progress, id]);
  }

  static async updateById(id: string, data: Partial<IDream>): Promise<IDream | undefined> {
    const query = `
      UPDATE dreams
      SET title = $1, description = $2, target_date = $3,
        dream_status = $4, plan_status = $5, progress = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *;
    `;
    const result = await pool.query(query, [
      data.title,
      data.description,
      data.target_date,
      data.dream_status,
      data.plan_status,
      data.progress,
      id,
    ]);
    return result.rows[0];
  }

  static async deleteById(id: string): Promise<void> {
    await pool.query("DELETE FROM dreams WHERE id = $1;", [id]);
  }
}

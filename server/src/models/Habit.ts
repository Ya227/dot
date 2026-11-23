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

export type HabitUpdate = Partial<
  Pick<IHabit, "title" | "description" | "frequency" | "is_active" | "dream_id">
>;

export class HabitModel {
  static async create(
    userId: string,
    title: string,
    frequency: string,
    dreamId: string | null = null,
    description: string | null = null,
  ): Promise<IHabit | undefined> {
    const query = `
      INSERT INTO habits (user_id, dream_id, title, description, frequency)
      SELECT $1, $2, $3, $4, $5
      WHERE $2::uuid IS NULL OR EXISTS (
        SELECT 1 FROM dreams WHERE id = $2 AND user_id = $1
      )
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, dreamId, title, description, frequency]);
    return result.rows[0];
  }

  static async findByUserId(userId: string): Promise<IHabit[]> {
    const query = `
      SELECT * FROM habits 
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async findByIdForUser(id: string, userId: string): Promise<IHabit | undefined> {
    const query = `
      SELECT * FROM habits
      WHERE id = $1 AND user_id = $2;
    `;
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }

  static async updateById(
    id: string,
    userId: string,
    data: HabitUpdate,
  ): Promise<IHabit | undefined> {
    const fields = ["title", "description", "frequency", "is_active", "dream_id"] as const;
    const values: unknown[] = [];
    const setters = fields.flatMap((field) => {
      if (!Object.prototype.hasOwnProperty.call(data, field) || data[field] === undefined) {
        return [];
      }
      values.push(data[field]);
      return [`${field} = $${values.length}`];
    });

    if (setters.length === 0) {
      return this.findByIdForUser(id, userId);
    }

    values.push(id, userId);
    const query = `
      UPDATE habits
      SET ${setters.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${values.length - 1} AND user_id = $${values.length}
      RETURNING *;
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async deleteById(id: string, userId: string): Promise<boolean> {
    const result = await pool.query("DELETE FROM habits WHERE id = $1 AND user_id = $2;", [
      id,
      userId,
    ]);
    return result.rowCount !== 0;
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

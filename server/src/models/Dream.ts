import pool from "./database";

export interface IDream {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  target_date: Date | null;
  is_ai_generated: boolean;
  dream_status: string;
  plan_status: string;
  progress: number;
  created_at: Date;
  updated_at: Date;
}

export type DreamUpdate = Partial<
  Pick<
    IDream,
    | "title"
    | "description"
    | "image_url"
    | "target_date"
    | "dream_status"
    | "plan_status"
    | "progress"
  >
>;

export class DreamModel {
  static async create(
    userId: string,
    title: string,
    description?: string,
    targetDate?: Date,
    imageUrl?: string,
  ): Promise<IDream> {
    const query = `
      INSERT INTO dreams (user_id, title, description, target_date, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      userId,
      title,
      description,
      targetDate,
      imageUrl || null,
    ]);
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

  static async findByIdForUser(id: string, userId: string): Promise<IDream | undefined> {
    const query = `
      SELECT * FROM dreams
      WHERE id = $1 AND user_id = $2;
    `;
    const result = await pool.query(query, [id, userId]);
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

  static async updateById(
    id: string,
    userId: string,
    data: DreamUpdate,
  ): Promise<IDream | undefined> {
    const fields = [
      "title",
      "description",
      "image_url",
      "target_date",
      "dream_status",
      "plan_status",
      "progress",
    ] as const;
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
      UPDATE dreams
      SET ${setters.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${values.length - 1} AND user_id = $${values.length}
      RETURNING *;
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async deleteById(id: string, userId: string): Promise<boolean> {
    const result = await pool.query("DELETE FROM dreams WHERE id = $1 AND user_id = $2;", [
      id,
      userId,
    ]);
    return result.rowCount !== 0;
  }
}

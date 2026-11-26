import pool from "./database";
import { IPlanTask } from "./PlanTask";

export interface IPlanStage {
  id: string;
  dream_id: string;
  title: string;
  stage_order: number;
  status: string;
  progress: number;
  created_at: Date;
  updated_at: Date;
  tasks?: IPlanTask[];
}

export class PlanStageModel {
  static async create(dreamId: string, title: string, stageOrder: number): Promise<IPlanStage> {
    const query = `
      INSERT INTO plan_stages (dream_id, title, stage_order)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(query, [dreamId, title, stageOrder]);
    return result.rows[0];
  }

  static async findByDreamId(dreamId: string): Promise<IPlanStage[]> {
    const query = `
      SELECT * FROM plan_stages 
      WHERE dream_id = $1 
      ORDER BY stage_order ASC;
    `;
    const result = await pool.query(query, [dreamId]);
    return result.rows;
  }

  static async findByIdForUser(id: string, userId: string): Promise<IPlanStage | undefined> {
    const query = `
      SELECT ps.* FROM plan_stages ps
      JOIN dreams d ON d.id = ps.dream_id
      WHERE ps.id = $1 AND d.user_id = $2;
    `;
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }

  static async updateProgress(id: string, progress: number, status: string): Promise<void> {
    const query = `
      UPDATE plan_stages 
      SET progress = $1, status = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $3;
    `;
    await pool.query(query, [progress, status, id]);
  }

  static async updateById(
    id: string,
    userId: string,
    data: Partial<IPlanStage>,
  ): Promise<IPlanStage | undefined> {
    const fields = ["title", "status", "progress"] as const;
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
      UPDATE plan_stages ps
      SET ${setters.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE ps.id = $${values.length - 1}
        AND EXISTS (
          SELECT 1 FROM dreams d
          WHERE d.id = ps.dream_id AND d.user_id = $${values.length}
        )
      RETURNING ps.*;
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async deleteById(id: string, userId: string): Promise<boolean> {
    const query = `
      DELETE FROM plan_stages ps
      USING dreams d
      WHERE ps.id = $1 AND ps.dream_id = d.id AND d.user_id = $2;
    `;
    const result = await pool.query(query, [id, userId]);
    return result.rowCount !== 0;
  }
}

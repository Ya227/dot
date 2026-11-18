import pool from "./database";

export interface IPlanStage {
  id: string;
  dream_id: string;
  title: string;
  stage_order: number;
  status: string;
  progress: number;
  created_at: Date;
  updated_at: Date;
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

  static async updateProgress(id: string, progress: number, status: string): Promise<void> {
    const query = `
      UPDATE plan_stages 
      SET progress = $1, status = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $3;
    `;
    await pool.query(query, [progress, status, id]);
  }
}

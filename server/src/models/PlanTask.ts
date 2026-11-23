import pool from "./database";

export interface IPlanTask {
  id: string;
  stage_id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  is_ai_generated: boolean;
  deadline: Date | null;
  task_order: number;
  created_at: Date;
  updated_at: Date;
}

export class PlanTaskModel {
  static async create(
    stageId: string,
    title: string,
    description: string | null,
    taskOrder: number,
    deadline?: Date | string,
    isAiGenerated: boolean = false,
  ): Promise<IPlanTask> {
    const query = `
      INSERT INTO plan_tasks (stage_id, title, description, task_order, deadline, is_ai_generated)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      stageId,
      title,
      description,
      taskOrder,
      deadline,
      isAiGenerated,
    ]);
    return result.rows[0];
  }

  static async findByStageId(stageId: string): Promise<IPlanTask[]> {
    const query = `
      SELECT * FROM plan_tasks 
      WHERE stage_id = $1 
      ORDER BY task_order ASC;
    `;
    const result = await pool.query(query, [stageId]);
    return result.rows;
  }

  static async toggleComplete(
    id: string,
    userId: string,
    isCompleted: boolean,
  ): Promise<IPlanTask | undefined> {
    const query = `
      UPDATE plan_tasks pt
      SET is_completed = $1, updated_at = CURRENT_TIMESTAMP
      FROM plan_stages ps
      JOIN dreams d ON d.id = ps.dream_id
      WHERE pt.id = $2 AND pt.stage_id = ps.id AND d.user_id = $3
      RETURNING pt.*;
    `;
    const result = await pool.query(query, [isCompleted, id, userId]);
    return result.rows[0];
  }

  static async deleteById(id: string, userId: string): Promise<boolean> {
    const query = `
      DELETE FROM plan_tasks pt
      USING plan_stages ps, dreams d
      WHERE pt.id = $1 AND pt.stage_id = ps.id
        AND ps.dream_id = d.id AND d.user_id = $2;
    `;
    const result = await pool.query(query, [id, userId]);
    return result.rowCount !== 0;
  }
}

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

  static async toggleComplete(id: string, isCompleted: boolean): Promise<void> {
    const query = `
      UPDATE plan_tasks 
      SET is_completed = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2;
    `;
    await pool.query(query, [isCompleted, id]);
  }

  static async deleteById(id: string): Promise<void> {
    const query = `
      DELETE FROM plan_tasks 
      WHERE id = $1;
    `;
    await pool.query(query, [id]);
  }
}

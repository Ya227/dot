import { Response } from "express";

import { AuthRequest } from "../middleware/tempAuth";
import { PlanStageModel, PlanTaskModel, DreamModel } from "../models";
import database from "../models/database";

export class PlanController {
  // --- ЭТАПЫ (STAGES) ---

  static async createStage(req: AuthRequest, res: Response) {
    try {
      const dreamId = req.params.dreamId as string;
      // Проверяем, что мечта принадлежит пользователю
      const dream = await DreamModel.findById(dreamId);
      if (!dream || dream.user_id !== req.user!.id) {
        res.status(404).json({ message: "Мечта не найдена" });
        return;
      }

      const { title, stage_order } = req.body;
      const stage = await PlanStageModel.create(dreamId, title, stage_order || 1);
      res.status(201).json(stage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при создании этапа" });
    }
  }

  static async updateStage(req: AuthRequest, res: Response) {
    try {
      const stageId = req.params.id as string;
      const { title, status, progress } = req.body;
      const updated = await PlanStageModel.updateById(stageId, { title, status, progress });

      if (!updated) {
        res.status(404).json({ message: "Этап не найден" });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при обновлении этапа" });
    }
  }

  static async deleteStage(req: AuthRequest, res: Response) {
    try {
      const stageId = req.params.id as string;
      await PlanStageModel.deleteById(stageId);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при удалении этапа" });
    }
  }

  // --- ЗАДАЧИ (TASKS) ---

  static async createTask(req: AuthRequest, res: Response) {
    try {
      const stageId = req.params.stageId as string;
      const { title, description, deadline, task_order, is_ai_generated } = req.body;

      const task = await PlanTaskModel.create(
        stageId,
        title,
        description || null,
        task_order,
        deadline,
        is_ai_generated || false,
      );
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при создании задачи" });
    }
  }

  static async toggleTask(req: AuthRequest, res: Response) {
    try {
      const taskId = req.params.id as string;
      const { is_completed } = req.body;

      await PlanTaskModel.toggleComplete(taskId, is_completed);

      // Возвращаем обновленную задачу
      const query = `SELECT * FROM plan_tasks WHERE id = $1;`;
      const result = await database.query(query, [taskId]);

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при обновлении задачи" });
    }
  }

  static async deleteTask(req: AuthRequest, res: Response) {
    try {
      const taskId = req.params.id as string;
      await PlanTaskModel.deleteById(taskId);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при удалении задачи" });
    }
  }
}

import { Response } from "express";

import { AuthRequest } from "../middleware/auth";
import { PlanStageModel, PlanTaskModel, DreamModel } from "../models";

export class PlanController {
  // --- ЭТАПЫ (STAGES) ---

  static async createStage(req: AuthRequest, res: Response) {
    try {
      const dreamId = req.params.dreamId as string;
      // Проверяем, что мечта принадлежит пользователю
      const dream = await DreamModel.findByIdForUser(dreamId, req.user!.id);
      if (!dream) {
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
      const updated = await PlanStageModel.updateById(stageId, req.user!.id, {
        title,
        status,
        progress,
      });

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
      const deleted = await PlanStageModel.deleteById(stageId, req.user!.id);
      if (!deleted) {
        res.status(404).json({ message: "Этап не найден" });
        return;
      }
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
      const stage = await PlanStageModel.findByIdForUser(stageId, req.user!.id);
      if (!stage) {
        res.status(404).json({ message: "Этап не найден" });
        return;
      }
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

      if (typeof is_completed !== "boolean") {
        res.status(400).json({ message: "is_completed должно быть boolean" });
        return;
      }
      const updated = await PlanTaskModel.toggleComplete(taskId, req.user!.id, is_completed);
      if (!updated) {
        res.status(404).json({ message: "Задача не найдена" });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при обновлении задачи" });
    }
  }

  static async updateTask(req: AuthRequest, res: Response) {
    try {
      const taskId = req.params.id as string;
      const allowed = ["title", "description", "deadline", "is_completed", "task_order"];
      const data: Record<string, unknown> = {};
      for (const field of allowed) {
        if (Object.prototype.hasOwnProperty.call(req.body, field)) data[field] = req.body[field];
      }
      if (
        Object.prototype.hasOwnProperty.call(data, "is_completed") &&
        typeof data.is_completed !== "boolean"
      ) {
        res.status(400).json({ message: "is_completed должно быть boolean" });
        return;
      }
      const updated = await PlanTaskModel.updateById(taskId, req.user!.id, data);
      if (!updated) {
        res.status(404).json({ message: "Задача не найдена" });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при обновлении задачи" });
    }
  }

  static async deleteTask(req: AuthRequest, res: Response) {
    try {
      const taskId = req.params.id as string;
      const deleted = await PlanTaskModel.deleteById(taskId, req.user!.id);
      if (!deleted) {
        res.status(404).json({ message: "Задача не найдена" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при удалении задачи" });
    }
  }
}

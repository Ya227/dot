import { Response } from "express";

import { AuthRequest } from "../middleware/tempAuth";
import { DreamModel, PlanStageModel, PlanTaskModel } from "../models";

export class DreamController {
  // Список мечт для карточек дашборда
  static async getDreams(req: AuthRequest, res: Response) {
    try {
      const dreams = await DreamModel.findByUserId(req.user!.id);
      res.status(200).json(dreams);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при получении мечт" });
    }
  }

  // Одна мечта + встроенный план (этапы и задачи)
  static async getDreamById(req: AuthRequest, res: Response) {
    try {
      const dreamID = req.params.id as string;
      const dream = await DreamModel.findById(dreamID);
      if (!dream || dream.user_id !== req.user!.id) {
        res.status(404).json({ message: "Мечта не найдена" });
        return;
      }

      const stages = await PlanStageModel.findByDreamId(dream.id);
      for (const stage of stages) {
        stage.tasks = await PlanTaskModel.findByStageId(stage.id);
      }
      // TODO: позже заменим 1+N запросов на один SQL с JSON_AGG
      res.status(200).json({ ...dream, stages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при получении мечты" });
    }
  }

  static async createDream(req: AuthRequest, res: Response) {
    try {
      const { title, description, target_date, image_url } = req.body;
      const dream = await DreamModel.create(
        req.user!.id,
        title,
        description,
        target_date,
        image_url,
      );
      res.status(201).json(dream);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при создании мечты" });
    }
  }

  static async updateDream(req: AuthRequest, res: Response) {
    try {
      const dreamID = req.params.id as string;
      const existing = await DreamModel.findById(dreamID);
      if (!existing || existing.user_id !== req.user!.id) {
        res.status(404).json({ message: "Мечта не найдена" });
        return;
      }
      const updated = await DreamModel.updateById(dreamID, req.body);
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при обновлении мечты" });
    }
  }

  static async deleteDream(req: AuthRequest, res: Response) {
    try {
      const dreamID = req.params.id as string;
      const existing = await DreamModel.findById(dreamID);
      if (!existing || existing.user_id !== req.user!.id) {
        res.status(404).json({ message: "Мечта не найдена" });
        return;
      }
      await DreamModel.deleteById(dreamID);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при удалении мечты" });
    }
  }
}

import { Response } from "express";

import { AuthRequest } from "../middleware/auth";
import { DreamModel } from "../models";

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
      const dream = await DreamModel.findByIdWithPlanForUser(dreamID, req.user!.id);
      if (!dream) {
        res.status(404).json({ message: "Мечта не найдена" });
        return;
      }

      res.status(200).json(dream);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при получении мечты" });
    }
  }

  static async createDream(req: AuthRequest, res: Response) {
    try {
      const { title, description, target_date, image_url } = req.body;
      if (typeof title !== "string" || !title.trim()) {
        res.status(400).json({ message: "Название мечты обязательно" });
        return;
      }
      const dream = await DreamModel.create(
        req.user!.id,
        title.trim(),
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
      if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        res.status(400).json({ message: "Тело запроса должно быть JSON-объектом" });
        return;
      }
      const fields = [
        "title",
        "description",
        "image_url",
        "target_date",
        "dream_status",
        "plan_status",
        "progress",
      ];
      if (!fields.some((field) => Object.prototype.hasOwnProperty.call(req.body, field))) {
        res.status(400).json({ message: "Не указаны поля для обновления мечты" });
        return;
      }
      if (
        Object.prototype.hasOwnProperty.call(req.body, "title") &&
        (typeof req.body.title !== "string" || !req.body.title.trim())
      ) {
        res.status(400).json({ message: "Название мечты не может быть пустым" });
        return;
      }

      const update = { ...req.body };
      if (typeof update.title === "string") {
        update.title = update.title.trim();
      }
      const updated = await DreamModel.updateById(dreamID, req.user!.id, update);
      if (!updated) {
        res.status(404).json({ message: "Мечта не найдена" });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при обновлении мечты" });
    }
  }

  static async deleteDream(req: AuthRequest, res: Response) {
    try {
      const dreamID = req.params.id as string;
      const deleted = await DreamModel.deleteById(dreamID, req.user!.id);
      if (!deleted) {
        res.status(404).json({ message: "Мечта не найдена" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при удалении мечты" });
    }
  }
}

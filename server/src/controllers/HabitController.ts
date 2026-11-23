import { Response } from "express";

import { AuthRequest } from "../middleware/auth";
import { DreamModel, HabitModel } from "../models";

export class HabitController {
  static async getHabits(req: AuthRequest, res: Response) {
    try {
      const habits = await HabitModel.findByUserId(req.user!.id);
      res.status(200).json(habits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при получении привычек" });
    }
  }

  static async getHabitById(req: AuthRequest, res: Response) {
    try {
      const habit = await HabitModel.findByIdForUser(req.params.id as string, req.user!.id);
      if (!habit) {
        res.status(404).json({ message: "Привычка не найдена" });
        return;
      }
      res.status(200).json(habit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при получении привычки" });
    }
  }

  static async createHabit(req: AuthRequest, res: Response) {
    try {
      if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        res.status(400).json({ message: "Тело запроса должно быть JSON-объектом" });
        return;
      }
      const { title, description, frequency, dream_id } = req.body;
      if (typeof title !== "string" || !title.trim()) {
        res.status(400).json({ message: "Название привычки обязательно" });
        return;
      }
      if (description !== undefined && description !== null && typeof description !== "string") {
        res.status(400).json({ message: "Описание должно быть строкой или null" });
        return;
      }
      if (frequency !== undefined && typeof frequency !== "string") {
        res.status(400).json({ message: "Частота должна быть строкой" });
        return;
      }
      if (dream_id !== undefined && dream_id !== null && typeof dream_id !== "string") {
        res.status(400).json({ message: "Некорректный идентификатор мечты" });
        return;
      }
      if (
        typeof dream_id === "string" &&
        !(await DreamModel.findByIdForUser(dream_id, req.user!.id))
      ) {
        res.status(404).json({ message: "Мечта не найдена" });
        return;
      }

      const habit = await HabitModel.create(
        req.user!.id,
        title.trim(),
        frequency || "daily",
        dream_id || null,
        description ?? null,
      );
      if (!habit) {
        res.status(404).json({ message: "Мечта не найдена" });
        return;
      }
      res.status(201).json(habit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при создании привычки" });
    }
  }

  static async updateHabit(req: AuthRequest, res: Response) {
    try {
      if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        res.status(400).json({ message: "Тело запроса должно быть JSON-объектом" });
        return;
      }
      const fields = ["title", "description", "frequency", "is_active", "dream_id"];
      if (!fields.some((field) => Object.prototype.hasOwnProperty.call(req.body, field))) {
        res.status(400).json({ message: "Не указаны поля для обновления привычки" });
        return;
      }
      if (
        Object.prototype.hasOwnProperty.call(req.body, "title") &&
        (typeof req.body.title !== "string" || !req.body.title.trim())
      ) {
        res.status(400).json({ message: "Название привычки не может быть пустым" });
        return;
      }
      if (
        Object.prototype.hasOwnProperty.call(req.body, "description") &&
        req.body.description !== null &&
        typeof req.body.description !== "string"
      ) {
        res.status(400).json({ message: "Описание должно быть строкой или null" });
        return;
      }
      if (
        Object.prototype.hasOwnProperty.call(req.body, "frequency") &&
        typeof req.body.frequency !== "string"
      ) {
        res.status(400).json({ message: "Частота должна быть строкой" });
        return;
      }
      if (
        Object.prototype.hasOwnProperty.call(req.body, "is_active") &&
        typeof req.body.is_active !== "boolean"
      ) {
        res.status(400).json({ message: "is_active должно быть boolean" });
        return;
      }
      if (Object.prototype.hasOwnProperty.call(req.body, "dream_id")) {
        if (req.body.dream_id !== null && typeof req.body.dream_id !== "string") {
          res.status(400).json({ message: "Некорректный идентификатор мечты" });
          return;
        }
        if (
          typeof req.body.dream_id === "string" &&
          !(await DreamModel.findByIdForUser(req.body.dream_id, req.user!.id))
        ) {
          res.status(404).json({ message: "Мечта не найдена" });
          return;
        }
      }

      const update = { ...req.body };
      if (typeof update.title === "string") {
        update.title = update.title.trim();
      }
      const updated = await HabitModel.updateById(req.params.id as string, req.user!.id, update);
      if (!updated) {
        res.status(404).json({ message: "Привычка не найдена" });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при обновлении привычки" });
    }
  }

  static async deleteHabit(req: AuthRequest, res: Response) {
    try {
      const deleted = await HabitModel.deleteById(req.params.id as string, req.user!.id);
      if (!deleted) {
        res.status(404).json({ message: "Привычка не найдена" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при удалении привычки" });
    }
  }
}

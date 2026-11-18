import { Response } from "express";

import { AuthRequest } from "../middleware/tempAuth";
import { HabitModel } from "../models";
import database from "../models/database";

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

  static async createHabit(req: AuthRequest, res: Response) {
    try {
      const { title, description, frequency, dream_id } = req.body;
      const habit = await HabitModel.create(req.user!.id, title, frequency, dream_id, description);
      res.status(201).json(habit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при создании привычки" });
    }
  }

  static async updateHabit(req: AuthRequest, res: Response) {
    try {
      const habitId = req.params.id as string;
      // Для простоты пока сделаем обновление только флага is_active или title
      // В реальном проекте здесь будет полноценный UPDATE всех полей
      const { title, is_active } = req.body;

      const query = `
        UPDATE habits 
        SET title = COALESCE($1, title), is_active = COALESCE($2, is_active), updated_at = CURRENT_TIMESTAMP 
        WHERE id = $3
        RETURNING *;
      `;
      const result = await database.query(query, [title, is_active, habitId]);

      if (result.rows.length === 0) {
        res.status(404).json({ message: "Привычка не найдена" });
        return;
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при обновлении привычки" });
    }
  }

  static async deleteHabit(req: AuthRequest, res: Response) {
    try {
      const habitId = req.params.id as string;
      await database.query("DELETE FROM habits WHERE id = $1;", [habitId]);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при удалении привычки" });
    }
  }
}

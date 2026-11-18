import { Request, Response, NextFunction } from "express";

import pool from "../models/database";

export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

// ВРЕМЕННАЯ заглушка. Позже тело функции заменим на проверку JWT,
// а сигнатуру и req.user оставим как есть — контроллеры не поменяются.
export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query("SELECT id, email FROM users ORDER BY created_at ASC LIMIT 1");
    if (result.rows.length === 0) {
      res.status(401).json({ message: "Нет пользователей для тестового режима" });
      return;
    }
    req.user = result.rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка тестовой авторизации" });
  }
};

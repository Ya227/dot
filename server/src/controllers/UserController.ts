import { Request, Response } from "express";

import { UserModel } from "../models";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при получении пользователей" });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // В реальном проекте пароль нужно хэшировать перед сохранением
      // Но для первого теста сойдет и так
      const user = await UserModel.create(email, password);

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при создании пользователя" });
    }
  }
}

import bcrypt from "bcryptjs";
import { NextFunction, Response } from "express";

import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/errorHandler";
import { UserModel } from "../models";

const BCRYPT_ROUNDS = 12;
const MAX_PASSWORD_BYTES = 72;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isUniqueViolation = (error: unknown): boolean =>
  typeof error === "object" && error !== null && "code" in error && error.code === "23505";

const validateNewPassword = (password: unknown): string => {
  if (
    typeof password !== "string" ||
    Buffer.byteLength(password, "utf8") < 8 ||
    Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES
  ) {
    throw new AppError("Новый пароль должен содержать от 8 до 72 байт", 400);
  }
  return password;
};

const validateCurrentPassword = (password: unknown): string => {
  if (
    typeof password !== "string" ||
    Buffer.byteLength(password, "utf8") === 0 ||
    Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES
  ) {
    throw new AppError("Укажите текущий пароль", 400);
  }
  return password;
};

const verifyCurrentPassword = async (userId: string, password: string): Promise<void> => {
  const user = await UserModel.findById(userId);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new AppError("Текущий пароль указан неверно", 401);
  }
};

export class ProfileController {
  static async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await UserModel.findProfileById(req.user!.id);
      if (!profile) {
        throw new AppError("Профиль не найден", 404);
      }
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!isRecord(req.body)) {
        throw new AppError("Тело запроса должно быть JSON-объектом", 400);
      }

      const allowedFields = ["email", "first_name", "last_name", "avatar_url", "current_password"];
      const unknownFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));
      if (unknownFields.length > 0) {
        throw new AppError(`Недопустимые поля: ${unknownFields.join(", ")}`, 400);
      }

      const data: {
        email?: string;
        first_name?: string | null;
        last_name?: string | null;
        avatar_url?: string | null;
      } = {};

      if (Object.prototype.hasOwnProperty.call(req.body, "email")) {
        const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
        if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new AppError("Укажите корректный email", 400);
        }
        await verifyCurrentPassword(
          req.user!.id,
          validateCurrentPassword(req.body.current_password),
        );
        data.email = email;
      } else if (Object.prototype.hasOwnProperty.call(req.body, "current_password")) {
        throw new AppError("current_password можно передавать только при смене email", 400);
      }

      for (const field of ["first_name", "last_name"] as const) {
        if (!Object.prototype.hasOwnProperty.call(req.body, field)) {
          continue;
        }
        const value = req.body[field];
        if (value !== null && (typeof value !== "string" || value.length > 100)) {
          throw new AppError(`${field} должен быть строкой не длиннее 100 символов или null`, 400);
        }
        data[field] = typeof value === "string" ? value.trim() || null : null;
      }

      if (Object.prototype.hasOwnProperty.call(req.body, "avatar_url")) {
        const value = req.body.avatar_url;
        if (value !== null && (typeof value !== "string" || value.length > 2048)) {
          throw new AppError(
            "avatar_url должен быть строкой не длиннее 2048 символов или null",
            400,
          );
        }
        data.avatar_url = typeof value === "string" ? value.trim() || null : null;
      }

      if (Object.keys(data).length === 0) {
        throw new AppError("Не указаны поля профиля для обновления", 400);
      }

      const profile = await UserModel.updateProfile(req.user!.id, data);
      if (!profile) {
        throw new AppError("Профиль не найден", 404);
      }
      res.status(200).json(profile);
    } catch (error) {
      if (isUniqueViolation(error)) {
        next(new AppError("Пользователь с таким email уже существует", 409));
        return;
      }
      next(error);
    }
  }

  static async changePassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!isRecord(req.body)) {
        throw new AppError("Тело запроса должно быть JSON-объектом", 400);
      }
      const currentPassword = validateCurrentPassword(req.body.current_password);
      const newPassword = validateNewPassword(req.body.new_password);
      if (currentPassword === newPassword) {
        throw new AppError("Новый пароль должен отличаться от текущего", 400);
      }

      await verifyCurrentPassword(req.user!.id, currentPassword);
      const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
      const updated = await UserModel.updatePassword(req.user!.id, passwordHash);
      if (!updated) {
        throw new AppError("Профиль не найден", 404);
      }
      res.status(200).json({ message: "Пароль успешно изменен" });
    } catch (error) {
      next(error);
    }
  }
}

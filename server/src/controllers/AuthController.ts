import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

import { AppError } from "../middleware/errorHandler";
import { IUser, UserModel } from "../models";
import { createAccessToken } from "../utils/jwt";

const BCRYPT_ROUNDS = 12;
const MAX_PASSWORD_BYTES = 72;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const publicUser = (user: IUser) => ({
  id: user.id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name,
  avatar_url: user.avatar_url,
  created_at: user.created_at,
});

const parseCredentials = (body: unknown) => {
  if (!isRecord(body)) {
    throw new AppError("Тело запроса должно быть JSON-объектом", 400);
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError("Укажите корректный email", 400);
  }
  if (
    Buffer.byteLength(password, "utf8") < 8 ||
    Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES
  ) {
    throw new AppError("Пароль должен содержать от 8 до 72 байт", 400);
  }

  return { email, password, body };
};

const getOptionalProfileField = (
  body: Record<string, unknown>,
  field: "first_name" | "last_name" | "avatar_url",
  maxLength: number,
): string | null => {
  const value = body[field];
  if (value === undefined || value === null || value === "") {
    return null;
  }
  if (typeof value !== "string" || value.length > maxLength) {
    throw new AppError(`Некорректное поле ${field}`, 400);
  }
  return value.trim() || null;
};

const isUniqueViolation = (error: unknown): boolean =>
  typeof error === "object" && error !== null && "code" in error && error.code === "23505";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, body } = parseCredentials(req.body);
      if (!isRecord(body)) {
        throw new AppError("Тело запроса должно быть JSON-объектом", 400);
      }

      const existing = await UserModel.findByEmail(email);
      if (existing) {
        throw new AppError("Пользователь с таким email уже существует", 409);
      }

      const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
      const user = await UserModel.create(email, passwordHash, {
        first_name: getOptionalProfileField(body, "first_name", 100),
        last_name: getOptionalProfileField(body, "last_name", 100),
        avatar_url: getOptionalProfileField(body, "avatar_url", 2048),
      });

      res.status(201).json({ user: publicUser(user), token: createAccessToken(user) });
    } catch (error) {
      if (isUniqueViolation(error)) {
        next(new AppError("Пользователь с таким email уже существует", 409));
        return;
      }
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = parseCredentials(req.body);
      const user = await UserModel.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        throw new AppError("Неверный email или пароль", 401);
      }

      res.status(200).json({ user: publicUser(user), token: createAccessToken(user) });
    } catch (error) {
      next(error);
    }
  }
}

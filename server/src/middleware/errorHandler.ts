import { Request, Response, NextFunction } from 'express';

/**
 * Кастомный класс ошибки с HTTP-статусом.
 * Позволяет выбрасывать ошибки с нужным кодом ответа.
 */
export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

/**
 * Глобальный middleware обработки ошибок.
 * Должен быть подключён ПОСЛЕ всех маршрутов.
 */
const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Если это наша кастомная ошибка — используем её статус
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // Для неизвестных ошибок — 500 (внутренняя ошибка сервера)
  console.error('Необработанная ошибка:', err);

  res.status(500).json({
    success: false,
    message: 'Внутренняя ошибка сервера',
  });
};

export default errorHandler;
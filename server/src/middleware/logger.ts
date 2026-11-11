import { Request, Response, NextFunction } from 'express';

/**
 * Middleware для логирования входящих запросов.
 * Выводит в консоль: метод, URL, статус ответа и время выполнения.
 */
const logger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  // Когда ответ будет отправлен, логируем информацию
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });

  // Передаём управление следующему middleware
  next();
};

export default logger;
import { Router } from 'express';

const router = Router();

// Временный маршрут для проверки что сервер работает
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Сервер работает!' });
});

// TODO: Подключить маршруты контроллеров
// router.use('/dreams', dreamRoutes);
// router.use('/users', userRoutes);

export default router;
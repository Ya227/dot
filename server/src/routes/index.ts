import { Router } from "express";

import userRoutes from "./userRoutes";

const router = Router();
// TODO: Подключить маршруты контроллеров
// router.use('/dreams', dreamRoutes);
router.use("/users", userRoutes);

export default router;

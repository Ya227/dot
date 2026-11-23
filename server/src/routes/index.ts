import { Router } from "express";

import authRoutes from "./authRoutes";
import dreamRoutes from "./dreamRoutes";
import habitRoutes from "./habitRoutes";
import planRoutes from "./planRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/dreams", dreamRoutes);
router.use("/habits", habitRoutes);
router.use(planRoutes);

export default router;

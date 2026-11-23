import { Router } from "express";

import { HabitController } from "../controllers/HabitController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.get("/", HabitController.getHabits);
router.get("/:id", HabitController.getHabitById);
router.post("/", HabitController.createHabit);
router.put("/:id", HabitController.updateHabit);
router.delete("/:id", HabitController.deleteHabit);

export default router;

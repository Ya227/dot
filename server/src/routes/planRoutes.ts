import { Router } from "express";

import { PlanController } from "../controllers/PlanController";
import { authenticate } from "../middleware/auth";

const router = Router();

// Маршруты для этапов (привязаны к конкретной мечте)
router.post("/dreams/:dreamId/stages", authenticate, PlanController.createStage);
router.put("/stages/:id", authenticate, PlanController.updateStage);
router.delete("/stages/:id", authenticate, PlanController.deleteStage);

// Маршруты для задач (привязаны к конкретному этапу или независимы по ID)
router.post("/stages/:stageId/tasks", authenticate, PlanController.createTask);
router.patch("/tasks/:id", authenticate, PlanController.updateTask);
router.delete("/tasks/:id", authenticate, PlanController.deleteTask);

export default router;

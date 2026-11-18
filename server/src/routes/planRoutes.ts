import { Router } from "express";

import { PlanController } from "../controllers/PlanController";
import { authenticate } from "../middleware/tempAuth";

const router = Router();

// Все маршруты защищены
router.use(authenticate);

// Маршруты для этапов (привязаны к конкретной мечте)
router.post("/dreams/:dreamId/stages", PlanController.createStage);
router.put("/stages/:id", PlanController.updateStage);
router.delete("/stages/:id", PlanController.deleteStage);

// Маршруты для задач (привязаны к конкретному этапу или независимы по ID)
router.post("/stages/:stageId/tasks", PlanController.createTask);
router.patch("/tasks/:id", PlanController.toggleTask); // Используем PATCH для частичного обновления (чекбокс)
router.delete("/tasks/:id", PlanController.deleteTask);

export default router;

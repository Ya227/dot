import { Router } from "express";

import { DreamController } from "../controllers/DreamController";
import { authenticate } from "../middleware/tempAuth";

const router = Router();

router.use(authenticate); // все маршруты ниже защищены заглушкой

router.get("/", DreamController.getDreams);
router.get("/:id", DreamController.getDreamById);
router.post("/", DreamController.createDream);
router.put("/:id", DreamController.updateDream);
router.delete("/:id", DreamController.deleteDream);

export default router;

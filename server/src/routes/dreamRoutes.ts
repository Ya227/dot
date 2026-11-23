import { Router } from "express";

import { DreamController } from "../controllers/DreamController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.get("/", DreamController.getDreams);
router.get("/:id", DreamController.getDreamById);
router.post("/", DreamController.createDream);
router.put("/:id", DreamController.updateDream);
router.delete("/:id", DreamController.deleteDream);

export default router;

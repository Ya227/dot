import { Router } from "express";

import { ProfileController } from "../controllers/ProfileController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);
router.get("/me", ProfileController.getProfile);
router.patch("/me", ProfileController.updateProfile);
router.patch("/me/password", ProfileController.changePassword);

export default router;

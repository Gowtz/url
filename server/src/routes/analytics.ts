import { Router } from "express";
import {
  getAnalyticsAll,
  getAnalyticsByAlias,
  getAnalyticsByTopic,
} from "../controllers/analytics";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/all", auth, getAnalyticsAll);
router.get("/:id", auth, getAnalyticsByAlias);
router.get("/topic/:topic", auth, getAnalyticsByTopic);

export default router;

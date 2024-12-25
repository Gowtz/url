import { Router } from "express";
import { redirect, shorten } from "../controllers/url";
import { auth } from "../middleware/auth";
import { ip } from "../middleware/ip";

const router = Router();
router.post("/", shorten);
router.get("/:hash", ip, redirect);

export default router;

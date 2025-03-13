import { Router } from "express";
import { HighlevelDesign } from "../controllers/high_level_design.js";

const router = Router();

router.post('/api/hld', HighlevelDesign);

export default router;
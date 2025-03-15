import { Router } from "express";
import { HighlevelDesign, train } from "../controllers/high_level_design.js";

const router = Router();

router.post('/api/hld', HighlevelDesign);
router.get('/api/train', train);

export default router;
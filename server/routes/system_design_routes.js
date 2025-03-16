import { Router } from "express";
import { DesignFlow, train, SystemDesign } from "../controllers/system_design.js";

const router = Router();

router.post('/api/design_flow', DesignFlow);
router.get('/api/train', train);
router.post('/api/system_design',SystemDesign )


export default router;
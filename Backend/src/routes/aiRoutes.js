import express from 'express';
import { AIController } from '../controllers/aiController';

const router = express.Router();
const aiController = new AIController();

// Define AI-related routes
router.post('/predict', aiController.predict);
router.get('/insights', aiController.getInsights);

export default router;
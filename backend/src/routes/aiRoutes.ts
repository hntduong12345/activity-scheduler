import express from 'express';
import { getRecommendations } from '../controllers/aiController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/recommendations', protect, getRecommendations);

export default router;

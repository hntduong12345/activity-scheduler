import express from 'express';
import { getPreferences, updatePreferences } from '../controllers/preferencesController';
import { getStats } from '../controllers/statsController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Preferences
router.get('/preferences', protect, getPreferences);
router.put('/preferences', protect, updatePreferences);

// Stats
router.get('/stats', protect, getStats);

export default router;

import express from 'express';
import { getActivities, createActivity, updateActivity, deleteActivity } from '../controllers/activityController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(protect, getActivities)
    .post(protect, createActivity);

router.route('/:id')
    .put(protect, updateActivity)
    .delete(protect, deleteActivity);

export default router;

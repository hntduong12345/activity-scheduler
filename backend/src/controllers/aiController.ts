import { Request, Response } from 'express';
import Activity from '../models/Activity';
import { generateScheduleRecommendations } from '../services/geminiService';

interface AuthRequest extends Request {
    user?: any;
}

export const getRecommendations = async (req: AuthRequest, res: Response) => {
    try {
        // Fetch user's activities for next 7 days or all future
        const activities = await Activity.find({
            userId: req.user.id,
            startTime: { $gte: new Date() } // Future activities
        }).limit(50);

        const recommendations = await generateScheduleRecommendations(activities);
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get recommendations' });
    }
};

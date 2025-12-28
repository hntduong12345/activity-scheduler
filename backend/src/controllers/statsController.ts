import { Request, Response } from 'express';
import Activity from '../models/Activity';

interface AuthRequest extends Request {
    user?: any;
}

export const getStats = async (req: AuthRequest, res: Response) => {
    try {
        const activities = await Activity.find({ userId: req.user.id });

        const totalActivities = activities.length;
        const completedActivities = activities.filter(a => a.isCompleted).length;
        const completionRate = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;

        const categoryBreakdown = activities.reduce((acc: any, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + 1;
            return acc;
        }, {});

        // Time distribution (simple hours diff)
        const timeDistribution = activities.reduce((acc: number, curr) => {
            const duration = (new Date(curr.endTime).getTime() - new Date(curr.startTime).getTime()) / (1000 * 60 * 60);
            return acc + duration;
        }, 0);

        res.json({
            totalActivities,
            completedActivities,
            completionRate,
            categoryBreakdown,
            totalHours: timeDistribution
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

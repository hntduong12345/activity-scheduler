import { Request, Response } from 'express';
import Activity from '../models/Activity';

interface AuthRequest extends Request {
    user?: any;
}

export const getActivities = async (req: AuthRequest, res: Response) => {
    try {
        const activities = await Activity.find({ userId: req.user.id });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createActivity = async (req: AuthRequest, res: Response) => {
    const { title, category, startTime, endTime, description, priority } = req.body;

    if (!title || !startTime || !endTime) {
        res.status(400).json({ message: 'Please provide all required fields' });
        return;
    }

    try {
        const activity = new Activity({
            userId: req.user.id,
            title,
            category,
            startTime,
            endTime,
            description,
            priority
        });

        const createdActivity = await activity.save();
        res.status(201).json(createdActivity);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updateActivity = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        const activity = await Activity.findById(id);

        if (!activity) {
            res.status(404).json({ message: 'Activity not found' });
            return;
        }

        if (activity.userId.toString() !== req.user.id.toString()) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedActivity);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteActivity = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        const activity = await Activity.findById(id);

        if (!activity) {
            res.status(404).json({ message: 'Activity not found' });
            return;
        }

        if (activity.userId.toString() !== req.user.id.toString()) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        await activity.deleteOne();
        res.json({ message: 'Activity removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

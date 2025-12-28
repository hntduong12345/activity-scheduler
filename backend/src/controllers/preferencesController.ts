import { Request, Response } from 'express';
import UserPreferences from '../models/Preferences';

interface AuthRequest extends Request {
    user?: any;
}

export const getPreferences = async (req: AuthRequest, res: Response) => {
    try {
        let prefs = await UserPreferences.findOne({ userId: req.user.id });
        if (!prefs) {
            prefs = await UserPreferences.create({ userId: req.user.id });
        }
        res.json(prefs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updatePreferences = async (req: AuthRequest, res: Response) => {
    try {
        const prefs = await UserPreferences.findOneAndUpdate(
            { userId: req.user.id },
            req.body,
            { new: true, upsert: true }
        );
        res.json(prefs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

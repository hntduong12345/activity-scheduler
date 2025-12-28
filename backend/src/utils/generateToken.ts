import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export const generateAccessToken = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

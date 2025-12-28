import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken';
import { JWT_SECRET } from '../config/env';

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        passwordHash
    });

    if (user) {
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        user.refreshTokens.push(refreshToken);
        await user.save();

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            accessToken,
            refreshToken
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        user.refreshTokens.push(refreshToken);
        await user.save();

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            accessToken,
            refreshToken
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(401).json({ message: 'No refresh token provided' });
        return;
    }

    try {
        const decoded: any = jwt.verify(refreshToken, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || !user.refreshTokens.includes(refreshToken)) {
            res.status(403).json({ message: 'Invalid refresh token' });
            return;
        }

        const accessToken = generateAccessToken(user.id);
        const newRefreshToken = generateRefreshToken(user.id);

        // Rotate refresh token
        user.refreshTokens = user.refreshTokens.filter(t => t !== refreshToken);
        user.refreshTokens.push(newRefreshToken);
        await user.save();

        res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

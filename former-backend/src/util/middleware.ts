import { JWT_SECRET } from './config.js';
import jwt from 'jsonwebtoken';
import type { NextFunction, Response } from 'express';
import type { TokenRequest } from '../types.js';
import { prisma } from '@former/shared/db';

export const tokenExtractor = async (
    req: TokenRequest,
    res: Response,
    next: NextFunction,
) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorization.substring(7);

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch {
        return res.status(401).json({ error: 'Invalid token' });
    }

    if (typeof decodedToken === 'string') {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await prisma.user.findUnique({
        where: { id: decodedToken.id },
        select: { id: true },
    });

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    req.token = decodedToken;

    return next();
};

export const optionalTokenExtractor = async (
    req: TokenRequest,
    res: Response,
    next: NextFunction,
) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next();
    }

    const token = authorization.substring(7);

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch {
        return next();
    }

    if (typeof decodedToken === 'string') {
        return next();
    }

    const user = await prisma.user.findUnique({
        where: { id: decodedToken.id },
        select: { id: true },
    });

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    req.token = decodedToken;

    return next();
};

import { JWT_SECRET } from './config.js';
import jwt from 'jsonwebtoken';
import type { NextFunction, Response } from 'express';
import type { TokenRequest } from '../types.js';

export const tokenExtractor = (
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

    req.token = decodedToken;

    return next();
};

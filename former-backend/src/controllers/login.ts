import { Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../schemas/prisma.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/config.js';

const LoginRouter = Router();

LoginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const { id } = user;
    const token = jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '24h',
    });

    return res.status(200).json({ username, token });
});

export default LoginRouter;

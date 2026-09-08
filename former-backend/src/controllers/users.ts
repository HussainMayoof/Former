import { Router } from 'express';
import bcrypt from 'bcrypt';
import { Prisma, prisma } from '@former/shared/db';
import { UserCreateParams } from '@former/shared/schemas';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/config.js';
import { tokenExtractor } from '../util/middleware.js';
import type { TokenRequest } from '../types.js';

const UserRouter = Router();

// Get all users
UserRouter.get('/', async (_req, res) => {
    const users = await prisma.user.findMany({
        include: {
            posts: true,
            comments: true,
        },
        omit: {
            passwordHash: true,
        },
    });

    res.json(users);
});

// Get one user
UserRouter.get('/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: 'Invalid user id' });
    }

    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            posts: true,
            comments: true,
        },
        omit: {
            passwordHash: true,
        },
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
});

// Create a new user
UserRouter.post('/', async (req, res) => {
    const { username, password } = UserCreateParams.parse(req.body);
    const passwordHash = await bcrypt.hash(password, 12);

    let user;
    try {
        user = await prisma.user.create({
            data: {
                username,
                passwordHash,
                displayName: username,
            },
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res
                    .status(409)
                    .json({ error: 'Username already taken' });
            }
        }

        console.error(e);
        return res.status(500).json({ error: 'Could not create user' });
    }

    const { id } = user;
    const token = jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '24h',
    });

    return res.status(200).json({ username, token });
});

// Change display name
UserRouter.patch(
    '/change-display-name',
    tokenExtractor,
    async (req: TokenRequest, res) => {
        if (!req.token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const id = req.token.id;
        const { displayName } = req.body;

        if (!displayName) {
            return res
                .status(400)
                .json({ error: 'New display name is required' });
        }

        let user;
        try {
            user = await prisma.user.update({
                where: { id },
                data: { displayName },
                include: {
                    posts: true,
                    comments: true,
                },
                omit: {
                    passwordHash: true,
                },
            });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ error: 'Could not change display name' });
        }

        return res.json({ user });
    },
);

// Change password
UserRouter.patch(
    '/change-password',
    tokenExtractor,
    async (req: TokenRequest, res) => {
        if (!req.token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const id = req.token.id;
        const { password } = UserCreateParams.pick({ password: true }).parse(
            req.body,
        );
        const passwordHash = await bcrypt.hash(password, 12);

        try {
            await prisma.user.update({
                where: { id },
                data: { passwordHash },
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: 'Could not change password' });
        }

        return res.status(200);
    },
);

export default UserRouter;

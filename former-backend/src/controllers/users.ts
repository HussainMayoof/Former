import { Router } from 'express';
import bcrypt from 'bcrypt';
import { Prisma, prisma } from '@former/shared/db';
import { UserCreateParams } from '@former/shared/schemas';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/config.js';

const UserRouter = Router();

//Get all users
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

//Create a new user
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

export default UserRouter;

import { Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../util/prisma.js';
import { UserCreateParams } from '../util/zod.js';

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

    const user = await prisma.user.create({
        data: {
            username,
            passwordHash,
        },
    });

    res.json(user);
});

export default UserRouter;

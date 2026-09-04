import express from 'express';
import UserRouter from './controllers/users.js';
import LoginRouter from './controllers/login.js';
import PostsRouter from './controllers/posts.js';
import cors from 'cors';
import { FRONTEND_URL } from './util/config.js';
import CommentsRouter from './controllers/comments.js';

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: FRONTEND_URL,
    }),
);

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/users', UserRouter);
app.use('/api/login', LoginRouter);
app.use('/api/posts', PostsRouter);
app.use('/api/comments', CommentsRouter);

export default app;

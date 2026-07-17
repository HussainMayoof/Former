import express from 'express';
import UserRouter from './controllers/users.js';
import LoginRouter from './controllers/login.js';
import PostsRouter from './controllers/posts.js';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/users', UserRouter);
app.use('/api/login', LoginRouter);
app.use('/api/posts', PostsRouter);

export default app;

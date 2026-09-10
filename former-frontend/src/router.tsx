import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout.tsx';
import Posts from './components/Posts';
import User from './components/User';
import NewPost from './components/NewPost.tsx';
import Post from './components/Post/index.tsx';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import Search from './components/Search';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Posts /> },
            { path: 'search', element: <Search /> },
            { path: 'search/:query', element: <Search /> },
            { path: 'users/:username', element: <User /> },
            { path: 'posts/new', element: <NewPost /> },
            { path: 'posts/:id', element: <Post /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: '*', element: <Posts /> },
        ],
    },
]);

export default router;

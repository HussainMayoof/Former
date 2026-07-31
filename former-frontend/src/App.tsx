import Header from './components/Header';
import { Route, Routes } from 'react-router';
import Posts from './components/Posts';
import Users from './components/Users';
import Post from './components/Post';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    return (
        <div
            className="flex flex-col gap-4 dark:bg-gray-800 dark:text-gray-200 bg-gray-200 text-gray-800 p-4 min-h-screen"
            data-theme="dark"
        >
            <Header />
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/users" element={<Users />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
};

export default App;

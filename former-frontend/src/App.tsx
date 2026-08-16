import Header from './components/Header';
import { Route, Routes } from 'react-router';
import Posts from './components/Posts';
import Users from './components/Users';
import Post from './components/Post';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';

const App = () => {
    return (
        <div className="flex flex-col gap-4 bg-base-100 p-4 min-h-screen">
            <Header />
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="*" element={<Posts />} />
                <Route path="/users" element={<Users />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route path="/posts/new" element={<NewPost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
};

export default App;

import Header from './components/Header';
import { Route, Routes } from 'react-router';
import Posts from './components/Posts';
import Users from './components/Users';

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
            </Routes>
        </div>
    );
};

export default App;

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import useTrivialDB from './hooks/useTrivialDB';
import { setQuizzes } from './store/quizzes_slice';

import Layout from './pages/Layout';
import Main from './pages/Main';
import Quiz from './pages/Quiz';
import Finish from './pages/Finish';
import NotFound from './pages/NotFound';

function App() {
    const { getQuizzes } = useTrivialDB();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchQuizzes() {
            let quizzes = await getQuizzes();
            dispatch(setQuizzes(quizzes));
        }
        fetchQuizzes();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="quiz/:quizId" element={<Quiz />} />
                <Route path="finish/?" element={<Finish />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;

import { useSelector } from 'react-redux';
import { Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import QuizList from './components/QuizList';

const Main = () => {
    const quizzes = useSelector((state) => state.quizzes);
    const nav = useNavigate();

    const handleLucky = () => {
        const randomQuizIndex = Math.round(Math.random() * (quizzes.length - 1));
        nav(`/quizzes/quiz/${quizzes[randomQuizIndex]?.id}`);
    };

    return (
        <Box>
            {quizzes.length > 0 ? (
                <>
                    <Button
                        sx={{
                            display: 'block',
                            width: '6rem',
                            marginX: 'auto',
                            marginBottom: 2,
                        }}
                        onClick={handleLucky}
                    >
                        I'm lucky
                    </Button>
                    <QuizList />
                </>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                    }}
                >
                    <CircularProgress sx={{}} />
                </Box>
            )}
        </Box>
    );
};

export default Main;

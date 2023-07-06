import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizItem = ({ category, amount, id }) => {
    const nav = useNavigate();

    const handlePlay = () => {
        nav(`/quiz/${id}`);
    };
    return (
        <Card
            sx={{ marginX: { xs: 1, sm: 0 }, flex: { xs: '1 0 150px', sm: '1 0 200px' } }}
        >
            <CardContent>
                <Typography>{category}</Typography>
                <Typography>{amount} questions</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handlePlay}>Play</Button>
            </CardActions>
        </Card>
    );
};

export default QuizItem;

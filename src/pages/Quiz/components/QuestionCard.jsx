import {
    Box,
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

const initialActiveQuestion = {
    category: '',
    type: '',
    difficulty: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
};

function decodeEntities(str) {
    const element = document.createElement('div');
    if (str && typeof str === 'string') {
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
    }
    return str;
}

const QuestionCard = ({
    activeQuestion = initialActiveQuestion,
    activeStep,
    setAnswer,
    answer,
    handleNext,
}) => {
    const [answerLabel, setAnswerLabel] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);

    const startDate = useMemo(() => new Date(), [activeQuestion]);

    const handleChangeAnswer = (answer) => {
        setAnswerLabel(answer);
    };

    const handleSetAnswer = () => {
        const answerObj = {
            num: activeStep,
            label: answerLabel,
            isCorrect: activeQuestion.correct_answer === answerLabel,
            timeAmount: new Date() - startDate,
        };
        setAnswer(answerObj);
        if (answer && !isAnswered) setIsAnswered(true);

        if (!answer.label) handleNext();
    };

    useEffect(() => {
        if (activeQuestion.category && !answer?.order.length) {
            const incorrectAnswers = [...activeQuestion?.incorrect_answers];

            incorrectAnswers.splice(
                Math.round(Math.random() * activeQuestion?.incorrect_answers.length),
                0,
                activeQuestion?.correct_answer
            );
            setAnswer({ num: activeStep, order: incorrectAnswers });
        }

        setIsAnswered(false);
        setAnswerLabel('');
    }, [activeQuestion]);

    useEffect(() => {
        if (answer?.label) {
            setAnswerLabel(answer.label);
        }
    }, [answer]);

    return (
        <Box
            component="section"
            sx={{
                padding: 2,
                marginBottom: 2,
                boxShadow: 2,
                borderRadius: 2,
            }}
        >
            <Typography component="h3" variant="h5" marginBottom={2}>
                Question {activeStep}
            </Typography>
            <Typography component="h4" variant="p" marginBottom={2}>
                {activeQuestion?.category}
            </Typography>
            <Typography marginBottom={2}>
                {decodeEntities(activeQuestion?.question)}
            </Typography>
            <RadioGroup
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 2,
                }}
            >
                {answer?.order?.map((answerItem) => {
                    const decodedAnswer = decodeEntities(answerItem);
                    return (
                        <FormControlLabel
                            value={decodedAnswer}
                            control={<Radio />}
                            label={decodedAnswer}
                            sx={{ flex: { xs: '', sm: '1 0 200px' } }}
                            key={decodedAnswer}
                            checked={decodedAnswer === answerLabel}
                            onChange={() => handleChangeAnswer(decodedAnswer)}
                        />
                    );
                })}
            </RadioGroup>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant={isAnswered ? 'contained' : 'outlined'}
                    color="success"
                    onClick={handleSetAnswer}
                    disabled={!answerLabel}
                >
                    Answer
                </Button>
            </Box>
        </Box>
    );
};

export default QuestionCard;

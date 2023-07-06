import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, MobileStepper, useTheme } from '@mui/material';
import { createPortal } from 'react-dom';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import QuestionCard from './components/QuestionCard';
import { selectQuizzes } from '../../store/quizzes_slice';
import QuitDialog from './components/QuitDialog';

const mapStateToProps = (state) => selectQuizzes(state);

const Quiz = ({ quizzes }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [category, setCategory] = useState();
    const [open, setOpen] = useState(false);
    const startData = useMemo(() => new Date(), []);
    const theme = useTheme();
    const nav = useNavigate();

    const { quizId } = useParams();
    const maxSteps = category?.questions?.length || 1;
    let header = document.getElementById('header');

    useEffect(() => {
        let isCorrectId;
        const quizIdNum = Number(quizId);

        for (let i = 0; i < quizzes.length; i++) {
            if (quizzes[i].id === quizIdNum) {
                isCorrectId = true;
                break;
            }
        }
        if (!quizzes.length || !isCorrectId) {
            nav('/quizzes', { replace: true });
        }
    }, []);

    useEffect(() => {
        setCategory(...quizzes?.filter((quiz) => quiz.id === Number(quizId)));
    }, [quizzes]);

    useEffect(() => {
        if (answers.length === maxSteps) {
            const correct = answers.reduce(
                (correctCount, answer) =>
                    answer.isCorrect ? correctCount + 1 : correctCount,
                0
            );
            const totalTime = new Date() - startData;

            const result = {
                total: maxSteps,
                correct,
                incorrect: maxSteps - correct,
                totalTime,
                averageTime: totalTime / maxSteps,
            };
            let searchString = '?';

            for (let i in result) {
                searchString = searchString + `${i}=${result[i]}&`;
            }
            nav(`/quizzes/finish/${searchString}`);
        }
    }, [answers]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const setAnswer = (answer) => {
        setAnswers((prevAnswers) => {
            if (answer.num > prevAnswers.at(-1)?.num || !prevAnswers.length) {
                handleNext();
                return [...prevAnswers, answer];
            }
            return prevAnswers.map((prevAnswer) =>
                prevAnswer.num === answer.num ? answer : prevAnswer
            );
        });
    };

    return (
        <>
            <Box>
                <QuestionCard
                    activeQuestion={category?.questions[activeStep]}
                    activeStep={activeStep + 1}
                    setAnswer={setAnswer}
                    answer={answers[activeStep]}
                />
                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            title="Please, give an answer"
                            onClick={handleNext}
                            disabled={
                                !answers[activeStep]?.label || activeStep === maxSteps - 1
                            }
                        >
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        >
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                        </Button>
                    }
                />
                <QuitDialog handleClose={handleClose} open={open} nav={nav} />
            </Box>
            {header &&
                createPortal(
                    <Button variant="outlined" color="error" onClick={handleClickOpen}>
                        Quit
                    </Button>,
                    header
                )}
        </>
    );
};

export default connect(mapStateToProps)(Quiz);

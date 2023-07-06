import QuizItem from './QuizItem';
import { Box } from '@mui/material';
import { selectQuizzes } from '../../../store/quizzes_slice';
import { connect } from 'react-redux';

const mapStateToProps = (state) => selectQuizzes(state);

const QuizList = ({ quizzes }) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {quizzes.map((quiz) => (
                <QuizItem
                    key={quiz.category}
                    category={quiz.category}
                    amount={quiz.amount}
                    id={quiz.id}
                />
            ))}
        </Box>
    );
};

export default connect(mapStateToProps)(QuizList);

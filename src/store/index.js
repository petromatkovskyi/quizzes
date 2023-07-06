import { configureStore } from '@reduxjs/toolkit';
import { quizzesReducer } from './quizzes_slice';

const store = configureStore({
    reducer: {
        quizzes: quizzesReducer,
    },
});

export default store;

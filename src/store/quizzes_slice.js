import { createSlice } from '@reduxjs/toolkit';
const initialState = [];

const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,

    reducers: {
        setQuizzes: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

export const selectQuizzes = (state) => {
    return { quizzes: state.quizzes };
};
export const { setQuizzes } = quizzesSlice.actions;
export const quizzesReducer = quizzesSlice.reducer;

export default quizzesSlice;

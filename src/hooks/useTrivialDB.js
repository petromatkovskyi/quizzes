import axios from '../api/axios';

const useTrivialDB = () => {
    async function getQuizzes() {
        try {
            const res = await axios.get('/api_category.php');
            const categories = res.data.trivia_categories;

            const randomQuizThemes = [];
            // const steps = [];

            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.round(Math.random() * categories.length - 1);
                const newRandomCategory = categories.splice(randomIndex, 1);

                randomQuizThemes.push(...newRandomCategory);
            }
            return await getRandomQuizzes(randomQuizThemes);
        } catch (e) {
            console.error(e.message);
        }
    }

    async function getQuiz(category) {
        try {
            const res = await axios.get(`/api.php?amount=10&category=${category.id}`);
            const { results } = res.data;

            return {
                category: results[0].category,
                amount: results.length,
                id: category.id,
                questions: results,
            };
        } catch (e) {
            console.error(e);
        }
    }

    async function getRandomQuizzes(randomQuizThemes) {
        const quizzesArrReq = randomQuizThemes.map((category) => getQuiz(category));
        return Promise.all(quizzesArrReq)
            .then((quizzes) => quizzes)
            .catch((e) => console.error(e));
    }

    return { getQuizzes };
};

export default useTrivialDB;

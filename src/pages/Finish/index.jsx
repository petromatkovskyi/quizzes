import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import GoBackHome from '../../shared/GoBackHome';
import PieChart from './components/PieChart';

function formateDataAndTime(time) {
    const formatter = new Intl.DateTimeFormat('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
    });

    const numTime = Number(time);
    if (isNaN(numTime)) return '';

    return formatter.format(time);
}

const Finish = () => {
    let [searchParams] = useSearchParams();
    const totalTime = searchParams.get('totalTime');
    const total = searchParams.get('total');
    const correct = searchParams.get('correct');
    const incorrect = searchParams.get('incorrect');
    const averageTime = searchParams.get('averageTime');

    const data = [
        {
            argument: 'correct',
            value: Math.round((Number(correct) * 100) / Number(total)),
        },
        {
            argument: 'incorrect',
            value: Math.round((Number(incorrect) * 100) / Number(total)),
        },
    ];

    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 2,
                padding: 2,
                marginBottom: 2,
                boxShadow: 2,
                borderRadius: 2,
            }}
        >
            <Box>
                {totalTime && (
                    <Typography>Time: {formateDataAndTime(totalTime)}</Typography>
                )}
                {total && <Typography>Total question :{total}</Typography>}
                {correct && incorrect && (
                    <Typography>
                        Correct {correct} / {incorrect} Incorrect
                    </Typography>
                )}
                {averageTime && (
                    <Typography>
                        Average time: {formateDataAndTime(averageTime)}
                    </Typography>
                )}
            </Box>
            <PieChart data={data} />
            <GoBackHome />
        </Box>
    );
};

export default Finish;

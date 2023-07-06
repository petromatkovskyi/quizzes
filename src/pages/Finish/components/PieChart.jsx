import { Chart, PieSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Paper, useMediaQuery, useTheme } from '@mui/material';

const PieChart = ({ data }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper
            sx={{
                border: '1px solid lightgreen',
                borderRadius: 3,
            }}
        >
            <Chart data={data} width={matches ? 300 : 300} height={matches ? 400 : 400}>
                <PieSeries valueField="value" argumentField="argument" />
                <Legend position="bottom" />
                <Title text="Answers" />
            </Chart>
        </Paper>
    );
};

export default PieChart;

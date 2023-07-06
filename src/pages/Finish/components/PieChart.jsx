import { Chart, PieSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Paper, useMediaQuery, useTheme } from '@mui/material';

const PieChart = ({ data }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper>
            <Chart
                data={data}
                width={matches ? 150 : 300}
                height={matches ? 300 : 300}
                sx={{
                    border: '1px solid lightgreen',
                    borderRadius: 3,
                }}
            >
                <PieSeries valueField="value" argumentField="argument" />
                <Legend position="bottom" />
                <Title text="Correct / Incorrect" />
            </Chart>
        </Paper>
    );
};

export default PieChart;

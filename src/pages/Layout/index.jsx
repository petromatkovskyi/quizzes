import { Box, Container, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Layout = () => {
    const nav = useNavigate();
    const location = useLocation();

    const handleGoHome = () => {
        const isFinishPage = location.pathname.match(/\/finish/);
        const isQuizPage = location.pathname.match(/\/quiz/);
        if (!isQuizPage) {
            nav('/', { replace: isFinishPage });
        }
    };
    return (
        <Container sx={{ padding: { xs: 0, sm: 2 } }}>
            <Box
                id="header"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: 1,
                    marginBottom: 2,
                    padding: 1,
                }}
                component="header"
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontSize: { xs: '1.1rem', sm: '2rem' },
                        textAlign: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={handleGoHome}
                >
                    Quizzes
                </Typography>
            </Box>
            <Box component="main">
                <Outlet />
            </Box>
        </Container>
    );
};

export default Layout;

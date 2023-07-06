import { Box, Typography } from '@mui/material';
import GoBackHome from '../../shared/GoBackHome';

const NotFound = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
            }}
        >
            <Typography variant="h4">404</Typography>
            <Typography variant="h5">This page could not be found.</Typography>
            <GoBackHome />
        </Box>
    );
};

export default NotFound;

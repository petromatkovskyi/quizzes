import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoBackHome = () => {
    const nav = useNavigate();

    const handleGoBackHome = () => nav('/', { replace: true });

    return (
        <Button variant="outlined" color="warning" onClick={handleGoBackHome}>
            Go back home
        </Button>
    );
};

export default GoBackHome;

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

const QuitDialog = ({ open, handleClose, nav }) => {
    const handleQuit = () => {
        nav('/quizzes');
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Quit</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to quit? All progress will be lost.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="success"
                    onClick={handleClose}
                    variant="outlined"
                    autoFocus
                >
                    Stay
                </Button>
                <Button color="error" onClick={handleQuit} variant="outlined">
                    Quit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuitDialog;

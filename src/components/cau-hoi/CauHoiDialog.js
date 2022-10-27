import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            {/* <CloseIcon /> */}
            </IconButton>
        ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
    const cauHoi = props.props
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Button variant="contained" onClick={handleClickOpen}>
            Detail
        </Button>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            {`Câu hỏi: ${cauHoi.content_Question}`}
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{ m: 0, p: 2 , width: 700}}>
            <Typography variant="h6" gutterBottom>
                Tất cả đáp án
            </Typography>

            {cauHoi.option_ans ? cauHoi.option_ans.map((ans, index) => {
                let indexAns
                switch (index) {
                case 0:
                    indexAns = "A"
                    break;
                case 1:
                    indexAns = "B"
                    break;
                
                case 2:
                    indexAns = "C"
                    break;
                
                case 3:
                    indexAns = "D"
                    break;
                
                default:
                    indexAns = "A"
                    break;
                }
                return <Typography variant="h6" gutterBottom key={index}>
                {`${indexAns}: ${ans}`}
            </Typography>
            }) : <h3>fail</h3>}

            <Typography variant="h6" gutterBottom>
                Đáp án đúng: {cauHoi.true_ans}
            </Typography>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Close
            </Button>
            </DialogActions>
        </BootstrapDialog>
        </div>
    );
}
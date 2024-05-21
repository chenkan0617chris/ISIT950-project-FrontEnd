import { ReactElement, useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import loginBg from '../images/login_new.png';
import RegisterForm from "../component/register.component";

export interface mySnackbar {
    severity: any,
    message: string
}

export default function Register(): ReactElement {

    const [open, setOpen] = useState(false);

    const [snack, setSnack] = useState<mySnackbar>({
        severity: 'success',
        message: '',
    });

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Box sx={{ 
            backgroundImage: `url(${loginBg})`,
            backgroundColor: 'lightgray',
            backgroundPosition: '50%',
            backgroundSize: 'cover',
            opacity: 0.8,
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
        }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={snack.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    
                    {snack.message}
                </Alert>
            </Snackbar>
            <RegisterForm 
                setOpen={setOpen}
                setSnack={setSnack}
            />
        </Box>
    );
};
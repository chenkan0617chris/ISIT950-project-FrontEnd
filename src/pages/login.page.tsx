import { ReactElement, useState } from "react";
import LoginForm from "../component/login.component";
import { Alert, Box, Container, Snackbar } from "@mui/material";
import loginBg from '../images/login_new.png';
import { login } from "../service/login";
import { SubmitHandler } from "react-hook-form";

export interface mySnackbar {
    severity: any,
    message: string
}

export function Login(): ReactElement {

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
            height: '100vh', 
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
            <LoginForm 
                setOpen={setOpen}
                setSnack={setSnack}
            />
        </Box>
    );
};
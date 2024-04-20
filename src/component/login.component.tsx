import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "../service/login";
import { mySnackbar } from "../pages/login.page";


type Inputs = {
    email: string
    password: string
  }

interface LoginFormProps {
    setOpen: (flag: boolean) => void,
    setSnack: (args: mySnackbar) => void
}

export default function LoginForm(props: LoginFormProps): ReactElement {

    const { setOpen, setSnack } = props;

    const { register, handleSubmit } = useForm<Inputs>();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
              
        login(data).then((res: any) => {
            const userInfo = res.userInfo;

            console.log(userInfo);
    
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            setOpen(true);

            setSnack({
                severity: 'success',
                message: 'Log in successfully!',
            });

            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
    
        }).catch((error: any) => {
            setSnack({
                severity: 'error',
                message: error.message
            });
            setOpen(true);
        });
    };

    return (
    <Stack spacing={4} sx={{ borderRadius: '30px', background: 'rgba(0, 0, 0, 0.30)', backdropFilter: 'blur(25px)', padding: '80px' }}>
        <Stack spacing={1}>
            <Typography variant="h4">Hi, Welcome Back</Typography>
            <Typography variant="body2">Don't have an account?</Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-Email">Email Address</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-Email"
                            type='text'
                            label="Email Address"
                            {...register('email')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel  htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Link variant="subtitle2">Forget password?</Link>
                    <Button type='submit' variant="contained">Sign In</Button>
                </Stack>
            </Box>
        </Stack>
    </Stack>
    )
};
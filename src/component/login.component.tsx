import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Select, Stack, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "../service/api";
import { mySnackbar } from "../pages/login.page";

var md5 = require('md5');

type Inputs = {
    username: string;
    password: string;
    type: string;
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

        let newData = {
            ...data,
            password: md5(data.password) 
         }
              
        login(newData).then((res: any) => {
            const userInfo = res;
    
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

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
            <Typography variant="h4" textAlign='center'>Login</Typography>
            <Typography variant="body2">Don't have an account? <Link href="/auth/register" color="secondary">Register Now!</Link></Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-Username">Username</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-Username"
                            type='text'
                            label="Username"
                            {...register('username')}
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
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...register('type')}
                            label="Type"
                            defaultValue='customers'
                        >
                            <MenuItem value='customers'>customer</MenuItem>
                            <MenuItem value='restaurants'>restaurant</MenuItem>
                            <MenuItem value='deliveryPerson'>delivery</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type='submit' variant="contained">Sign In</Button>
                </Stack>
            </Box>
        </Stack>
    </Stack>
    )
};
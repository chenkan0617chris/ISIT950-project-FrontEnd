import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    email: string
    password: string
  }

export default function LoginForm(): ReactElement {

    const { register, handleSubmit } = useForm<Inputs>();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    return (
    <Stack spacing={4} sx={{ maxWidth: 400 }}>
        <Stack spacing={1}>
            <Typography variant="h4">Sign In</Typography>
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
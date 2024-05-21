import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Select, Stack, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { SubmitHandler, useForm } from "react-hook-form";
import { registerApi } from "../service/api";
import { mySnackbar } from "../pages/Login";

var md5 = require('md5');

type Inputs = {
    username: string;
    password: string;
    phone?: string;
    email?: string;
    type: string;
    address: string;
    postcode: string;
    title?: string;
    name?: string;
  }

interface RegisterFormProps {
    setOpen: (flag: boolean) => void,
    setSnack: (args: mySnackbar) => void
}

export default function RegisterForm(props: RegisterFormProps): ReactElement {

    const { setOpen, setSnack } = props;

    const { register, handleSubmit } = useForm<Inputs>();

    const [type, setType] = useState();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChange = (event: any) => {
        setType(event.target.value);
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        let newData = {
            ...data,
            password: md5(data.password) 
         }
              
         registerApi(newData).then((res: any) => {
            setOpen(true);
            setSnack({
                severity: 'success',
                message: 'Register successfully!',
            });

            setTimeout(() => {
                window.location.href = '/auth/login';
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
    <Stack spacing={4} sx={{ margin: '24px 0', borderRadius: '30px', background: 'rgba(0, 0, 0, 0.30)', backdropFilter: 'blur(25px)', padding: '80px' }}>
        <Stack spacing={1}>
            <Typography variant="h4" textAlign='center'>Register</Typography>
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
                    {type === "restaurants" && <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-Title">Restaurant Title</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-Title"
                            type='text'
                            label="Title"
                            {...register('title')}
                        />
                    </FormControl>}
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-Name">Name</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-Name"
                            type='text'
                            label="Name"
                            {...register('name')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-Phone">Phone</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-Phone"
                            type='text'
                            label="Phone"
                            {...register('phone')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-Address">Address</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-Address"
                            type='text'
                            label="Address"
                            {...register('address')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-Postcode">Postcode</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-Postcode"
                            type='text'
                            label="Postcode"
                            {...register('postcode')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...register('type')}
                            label="Type"
                            onChange={handleChange}
                            value={type}
                            defaultValue='customers'
                        >
                            <MenuItem value='customers'>customer</MenuItem>
                            <MenuItem value='restaurants'>restaurant</MenuItem>
                            <MenuItem value='deliveryPerson'>delivery</MenuItem>
                        </Select>
                    </FormControl>
                    <Link href="/auth/login" variant="subtitle2" sx={{ color: 'black'}}>Login now?</Link>
                    <Button type='submit' variant="contained">Sign In</Button>
                </Stack>
            </Box>
        </Stack>
    </Stack>
    )
};
import { Alert, Box, Button, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Skeleton, Snackbar, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mySnackbar } from "./login.page";
import loginBg from '../images/login_new.png';
import { addDish, editDish } from "../service/api";
import { useSearchParams } from "react-router-dom";

interface Inputs {
    name?: string;
    price?: number;
    description?: string;
    title?: string;
    available?: string;
}

const AddDish = () => {

    const [userInfo, setUserInfo] = useState<any>();

    const { register, handleSubmit } = useForm<Inputs>();

    const [searchParams, setSearchParams] = useSearchParams('mid');

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState<any>();

    const isEdit = window.location.search ? true : false;

    const [snack, setSnack] = useState<mySnackbar>({
        severity: 'success',
        message: '',
    });

    useEffect(() => {

        let newUserInfo = JSON.parse(sessionStorage.getItem("userInfo") as any);
        
        setUserInfo(newUserInfo);

        if(searchParams.get('mid')) {
            let data = {
                mid: searchParams.get('mid'),
                name: searchParams.get('name'),
                description: searchParams.get('description'),
                price: searchParams.get('price'),
            }

            setForm(data);
        }
    }, []);


    const onSubmit = (data: any) => {

        let newData = {
            ...data,
            rid: userInfo.rid,
        }

        const func = isEdit ? editDish : addDish;

        if(isEdit){
            newData = {
                ...newData,
                mid: searchParams.get('mid'),
            }
            
        } 

        func(newData).then((res: any) => {
            setSnack({
                severity: 'success',
                message: res.message,
            });
            setOpen(true);

            setTimeout(() => {
                window.location.href = `/restaurant?title=${userInfo?.title}`;
            }, 3000);
            
        }).catch((err: any) => {
            setSnack({
                severity: 'error',
                message: err.message,
            });
            setOpen(true);
        });
    };



    const handleClose = () => {
        setOpen(false);
    }

    const renderForm = () => {
        console.log(form?.name);
        if(isEdit) {
            if(form?.name) {
                return <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-Title">Dish Name</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-Name"
                            type='text'
                            label="Dish Name"
                            defaultValue={form?.name}
                            {...register('name')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-Price">Price</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-Price"
                            type='number'
                            label="Price"
                            defaultValue={Number(form?.price)}
                            {...register('price')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-Description">Description</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-Description"
                            type='text'
                            label="Description"
                            defaultValue={form?.description}

                            {...register('description')}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Available</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            {...register('available')}
                            defaultValue='true'
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    <Button type='submit' variant="contained">Update</Button>
                </Stack>
            </Box>
            }
            return <Skeleton animation="wave" />
        } return <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Title">Dish Name</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Name"
                    type='text'
                    label="Dish Name"
                    {...register('name')}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Price">Price</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Price"
                    type='number'
                    label="Price"
                    {...register('price')}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Description">Description</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Description"
                    type='text'
                    label="Description"
                    {...register('description')}
                />
            </FormControl>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Available</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    {...register('available')}
                    defaultValue='true'
                >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
            <Button type='submit' variant="contained">Update</Button>
        </Stack>
    </Box>
    };
    
    return <Box sx={{ 
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
        <Container sx={{ background: 'white', p: 8, pt: 4, pb: 4, borderRadius: '8px' }}>
            <Typography variant="h3" mb={4}>Restaurant - {isEdit ? 'Edit' : 'Add'} dishes</Typography>
            {renderForm()}
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
        </Container>
    </Box>
};

export default AddDish;
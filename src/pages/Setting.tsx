import { Alert, Box, Button, Container, FormControl, InputLabel, OutlinedInput, Snackbar, Stack, Typography } from "@mui/material";
import loginBg from '../images/login_new.png';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCustomer, updateRestaurantSettings, updateSettings } from "../service/api";
import { mySnackbar } from "./Login";
import moment from "moment";

interface Inputs {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    postcode?: number;
    description?: string;
    title?: string;
}

const Setting = () => {

    const [userInfo, setUserInfo] = useState<any>();

    const { register, handleSubmit } = useForm<Inputs>();

    useEffect(() => {

        let newUserInfo = JSON.parse(sessionStorage.getItem("userInfo") as any);

        if(newUserInfo && newUserInfo.type === 'customers'){
            getCustomer({
                cid: newUserInfo.cid
            }).then((customer) => {
                setUserInfo(customer);
            });
        } else {
            setUserInfo(newUserInfo);
        }
        
    }, []);

    const onSubmit = (data: any) => {
        let newDate = {
            ...data,
        }

        if(userInfo.cid) {
            newDate = {
                ...newDate,
                cid: userInfo.cid 
            }
        } else {
            newDate = {
                ...newDate,
                rid: userInfo.rid 
            }
        }

        const func = userInfo.cid ?  updateSettings : updateRestaurantSettings;

        
        func(newDate).then((res: any) => {
            sessionStorage.setItem("userInfo", JSON.stringify(res));
            setUserInfo(res);
            setSnack({
                severity: 'success',
                message: 'updated successfully!',
            });
            setOpen(true);
        }).catch((err) => {
            setSnack({
                severity: 'error',
                message: 'update failed!',
            });
            setOpen(true);
        });
    };

    const [open, setOpen] = useState(false);

    const [snack, setSnack] = useState<mySnackbar>({
        severity: 'success',
        message: '',
    });

    const handleClose = () => {
        setOpen(false);
    }

    const renderCustomerForm = () => {
        return <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Name">Name</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Name"
                    type='text'
                    label="Name"
                    defaultValue={userInfo?.name}
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
                    defaultValue={userInfo?.phone}
                    {...register('phone')}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Email">Email</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Email"
                    type='text'
                    label="Email"
                    defaultValue={userInfo?.email}

                    {...register('email')}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Address">Address</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Address"
                    type='text'
                    label="Address"
                    defaultValue={userInfo?.address}

                    {...register('address')}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Postcode">Postcode</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Postcode"
                    type='number'
                    label="Postcode"
                    defaultValue={userInfo?.postcode}
                    {...register('postcode')}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Balance">Balance</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Balance"
                    type='number'
                    label="Balance"
                    defaultValue={userInfo?.balance}
                    disabled
                />
            </FormControl>
            {userInfo?.membership !== 0 && <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Membership">Membership</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Membership"
                    type='text'
                    label="Membership"
                    defaultValue={moment(userInfo?.membership_expire_date).format('YYYY-MM-DD H:mm:ss')}
                    disabled
                />
            </FormControl>}
            <Button type='submit' variant="contained">Update</Button>
        </Stack>
    </Box>
    };

    const renderRestaurantForm = () => {
        return <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Title">Title</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Title"
                    type='text'
                    label="Title"
                    defaultValue={userInfo?.title}
                    {...register('title')}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Description">Description</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Description"
                    type='text'
                    label="Description"
                    defaultValue={userInfo?.description}
                    {...register('description')}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Phone">Phone</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Phone"
                    type='text'
                    label="Phone"
                    defaultValue={userInfo?.phone}
                    {...register('phone')}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Email">Email</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Email"
                    type='text'
                    label="Email"
                    defaultValue={userInfo?.email}

                    {...register('email')}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Address">Address</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Address"
                    type='text'
                    label="Address"
                    defaultValue={userInfo?.address}

                    {...register('address')}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Postcode">Postcode</InputLabel>
                <OutlinedInput
                    required
                    id="outlined-adornment-Postcode"
                    type='number'
                    label="Postcode"
                    defaultValue={userInfo?.postcode}
                    {...register('postcode')}
                />
            </FormControl>
            <Button type='submit' variant="contained">Update</Button>
        </Stack>
    </Box>
    };

    const renderForm = () => {
        if(userInfo) {
            if(userInfo.type === 'customers') {
                return  renderCustomerForm();
            } else if (userInfo.type === 'restaurants') {
                return renderRestaurantForm();
            } else {
                return renderRestaurantForm();
            }
        } else {
            return <></>;
        }
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
            <Typography variant="h3" mb={4} sx={{ textTransform: 'capitalize' }}>{userInfo?.type} Settings</Typography>
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

export default Setting;
import { Alert, Box, Button, Container, Divider, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Snackbar, Stack, Typography } from "@mui/material";
import TitleAndSearch from "../component/TitleAndSearch.component";
import { ORANGE, WHITE } from "../utils/constant";
import { searchInputs } from "../component/searchForm.component";
import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { order } from "../service/api";
import { mySnackbar } from "./login.page";

const CartPage = () => {

    const [cart, setCart] = useState<any>();

    const [itemsCount, setItemsCount] = useState(JSON.parse(sessionStorage.getItem("itemsCount") as any) || 0);

    const [userInfo, setUserInfo] = useState() as any;

    const [total, setTotal] = useState(0);

    const [subscription, setSubscription] = useState('no');

    const [membershipFee, setMembershipFee] = useState(0);

    const [delivery_fee, setDelivery_fee] = useState(9.99);

    const [discount, setDiscount] = useState(0);

    useEffect(() => {

    }, []);

    const onSubmit = (value: searchInputs) => {

        if (!userInfo) {
            window.location.href = '/auth/login';
            return;
        };

        window.location.href = `/search?name=${value.name}&distance=${value.distance}`;
    };

    const handleChange = (e: any) => {
        setSubscription(e.target.value);
        if(e.target.value === 'monthly') {
            setMembershipFee(20);
            setDelivery_fee(0);
        } else if(e.target.value === 'annually') {
            setMembershipFee(120);
            setDelivery_fee(0);
        } else {
            setDelivery_fee(9.99);
            setMembershipFee(0);
        }
    };

    useEffect(() => {
        if(subscription === 'no'){
            setDiscount(0);
        } else {
            let amount = (total*0.1);
            setDiscount(Number(amount.toFixed(2)));
        }

    }, [total, subscription]);

    useEffect(() => {
        let cartItems = sessionStorage.getItem("cart");
        if(cartItems) {
            let newItems = JSON.parse(cartItems) as {};

            setCart(newItems);
        }

        let newUserInfo = JSON.parse(sessionStorage.getItem("userInfo") as any);
        
        setUserInfo(newUserInfo);
        
    }, []);

    useEffect(() => {
        let newTotal = 0;
        if(isEmpty(cart)) return;
        Object.values(cart).forEach((item: any) => {
            newTotal += item.count * item.price;
        })

        newTotal += delivery_fee;
        newTotal += membershipFee;

        newTotal -= discount;

        setTotal(newTotal);
    }, [cart, delivery_fee, membershipFee, discount]);

    const handleSub = (mid: number) => {

        const currentItem = cart[mid];
        if(currentItem.count > 1) {
            currentItem.count--;

            setCart({
                ...cart,
                [mid]: currentItem
            })

            setItemsCount(itemsCount-1);
        } else {
            const newItems = cart;
            delete newItems[mid];
            setCart(newItems);
            setItemsCount(itemsCount-1);
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        sessionStorage.setItem('itemsCount', JSON.stringify(itemsCount-1));
      
    };

    const handleAdd = (mid: number) => {
        const currentItem = cart[mid];
        currentItem.count++;

        setCart({
            ...cart,
            [mid]: currentItem
        })

        setItemsCount(itemsCount+1);

        sessionStorage.setItem('cart', JSON.stringify(cart));
        sessionStorage.setItem('itemsCount', JSON.stringify(itemsCount+1));
    };

    const renderCart = () => {
        if(!isEmpty(cart)) {
            console.log(cart);
            return Object.values(cart).map((item: any) => {
                return (
                    <Stack spacing={4} mt={2}>
                        <Stack spacing={2}>
                            <Typography variant="body1">From<Typography component='span' color={ORANGE}> {item.title}</Typography></Typography>
                        </Stack>
                        <Stack spacing={2} direction='row' justifyContent='space-between'>
                            <Stack spacing={2}>
                                <Typography variant="body1">{item.name}</Typography>
                                <Typography variant="body1">${item.price}</Typography>
                            </Stack>
                            <Stack spacing={2} alignItems='center' direction='row'>
                                <Button onClick={() => handleSub(item.mid)}><Typography variant="body1" component='span'>-</Typography></Button>
                                <Typography variant="body1" component='span'>{item.count}</Typography>
                                <Button onClick={() => handleAdd(item.mid)}><Typography variant="body1" component='span'>+</Typography></Button>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Stack spacing={2} direction='row' justifyContent='space-between'>
                                <Typography variant="body1">SubTotal</Typography>
                                <Typography variant="body1">${item.price * item.count}</Typography>
                            </Stack>
                        </Stack>
                        <Divider variant="middle" />
                    </Stack>
                );
            })
        } else {
            return (
                <Typography mt='100px' variant="h4" textAlign='center'>Your cart is empty!</Typography>
            );
        }
    };

    const submitOrder = () => {
        if(!isEmpty(cart)){
            let data = {
                cid: userInfo.cid,
                items: Object.values(cart),
                total
            }

            order(data).then((res: any) => {
                setSnack({
                    severity: 'success',
                    message: 'Ordered successfully!',
                })
                setOpen(true);

                setTimeout(() => {
                    sessionStorage.removeItem('cart');
                    sessionStorage.removeItem('itemsCount');
                    window.location.href = '/orderList';
                }, 2000);


            })
        }
    };

    const [open, setOpen] = useState(false);

    const [snack, setSnack] = useState<mySnackbar>({
        severity: 'success',
        message: '',
    });

    const handleClose = () => {
        setOpen(false);
    }


    return (
        <Box sx={{ width: '100%',  background: `url(./images/cart_bg.png)`, backgroundSize: 'cover', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
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
            <TitleAndSearch
                onSubmit={onSubmit}
            />
            <Box  display='flex' flexDirection='row' width={1200} justifyContent='space-between'>
                <Box minHeight='300px' m={4} p={4} width='500px' borderRadius={2} sx={{ background: WHITE }}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="h5">Checkout</Typography>
                            <Divider></Divider>
                        </Box>
                        <Box>
                            <Typography variant="h5" color={ORANGE}>Delivery address</Typography>
                            <Typography variant="body1">{userInfo?.address}</Typography>

                            {/* <Paper sx={{ width: 350, height: 75, textAlign: 'center', lineHeight: '75px'}} elevation={3}>{userInfo?.address}</Paper> */}
                            <Divider></Divider>
                        </Box>
                        <Box>
                            <Typography variant="h5" color={ORANGE}>Membership subscription</Typography>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="no"
                                    name="radio-buttons-group"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel color="white" value="monthly" control={<Radio />} label="Monthly" />
                                    <FormControlLabel color="white" value="annually" control={<Radio />} label="Annually" />
                                    <FormControlLabel color="white" value="no" control={<Radio />} label="No subscription" />
                                </RadioGroup>
                            </FormControl>
                            <Divider></Divider>
                        </Box>

                        
                    </Stack>
                </Box>
                <Box minHeight='300px' m={4} p={4} width='500px' borderRadius={2} sx={{ background: WHITE }}>
                    <Stack spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h5">Cart</Typography>
                        <Typography variant="body1">{itemsCount} Items</Typography>
                    </Stack>
                    {renderCart()}
                    {!isEmpty(cart) && <>
                        {subscription === 'no' &&<Stack mt={2} spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
                            <Typography variant='body1'>Delivery fee</Typography>
                            <Typography variant='h5'>${delivery_fee}</Typography>
                        </Stack>}
                        {subscription !== 'no' &&<Stack mt={2} spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
                            <Typography variant='body1'>Membership fee</Typography>
                            <Typography variant='h5'>${membershipFee}</Typography>
                        </Stack>}
                        {subscription !== 'no' &&<Stack mt={2} spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
                            <Typography variant='body1'>Discount</Typography>
                            <Typography variant='h5'>${discount}</Typography>
                        </Stack>}
                        <Stack mt={2} spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
                            <Typography variant='h5'>Total</Typography>
                            <Typography variant='h5'>${total.toFixed(2)}</Typography>
                        </Stack>
                        <Button onClick={() => {submitOrder()}} sx={{ mt: 2 }} fullWidth variant="contained">Proceed To Payment</Button>
                    </>}
                </Box>
            </Box>
        </Box>
    )
};

export default CartPage;
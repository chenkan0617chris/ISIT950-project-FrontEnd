import { Alert, Box, Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Snackbar, Stack, Typography } from "@mui/material";
import TitleAndSearch from "../component/TitleAndSearch.component";
import { ANNUAlLY_MEMBERSHIP_FEE, DELIVERY_FEE, MONTHLY_MEMBERSHIP_FEE, ORANGE, WHITE } from "../utils/constant";
import { searchInputs } from "../component/searchForm.component";
import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { getCustomer, membership, order } from "../service/api";
import { mySnackbar } from "./Login";
import moment from "moment";

const CartPage = () => {

    const [cart, setCart] = useState<any>();

    const [itemsCount, setItemsCount] = useState(JSON.parse(sessionStorage.getItem("itemsCount") as any) || 0);

    const [userInfo, setUserInfo] = useState() as any;

    const [total, setTotal] = useState(0);

    const [subscription, setSubscription] = useState('no');

    const [membershipFee, setMembershipFee] = useState(0);

    const [delivery_fee, setDelivery_fee] = useState(DELIVERY_FEE);

    const [discount, setDiscount] = useState(0);

    const onSubmit = (value: searchInputs) => {

        if (!userInfo) {
            window.location.href = '/auth/login';
            return;
        };

        window.location.href = `/search?name=${value.name}&distance=${value.distance}`;
    };

    const handleChange = (e: any) => {
        if(isEmpty(cart)) return;

        setSubscription(e.target.value);
        
    };

    useEffect(() => {

    }, []);


    useEffect(() => {
        if(isEmpty(cart)) return;
        let newTotal = 0;
        Object.values(cart).forEach((item: any) => {
            newTotal += item.count * item.price;
        })
        if(userInfo?.membership && moment(userInfo?.membership_expire_date).diff(moment()) > 0){
            setDelivery_fee(0);
            setMembershipFee(0);
            let newDiscount = Number(Number(newTotal*0.1).toFixed(2));
            setDiscount(newDiscount);
            setTotal(newTotal-newDiscount);
        } else {
            if(subscription === 'monthly') {
                setMembershipFee(MONTHLY_MEMBERSHIP_FEE);
                setDelivery_fee(0);
                newTotal += MONTHLY_MEMBERSHIP_FEE;
                let newDiscount = Number(Number(newTotal*0.1).toFixed(2));
                setDiscount(newDiscount);
                setTotal(newTotal-newDiscount);
    
            } else if(subscription === 'annually') {
                setMembershipFee(ANNUAlLY_MEMBERSHIP_FEE);
                setDelivery_fee(0);
                newTotal += ANNUAlLY_MEMBERSHIP_FEE;
                let newDiscount = Number(Number(newTotal*0.1).toFixed(2));
                setDiscount(newDiscount);
                setTotal(newTotal-newDiscount);
            } else {
                setDelivery_fee(DELIVERY_FEE);
                setMembershipFee(0);
                newTotal += DELIVERY_FEE;
                setTotal(newTotal);
            }
        }
        
    }, [userInfo, cart, subscription]);

    useEffect(() => {
        let cartItems = sessionStorage.getItem("cart");
        if(cartItems) {
            let newItems = JSON.parse(cartItems) as {};

            setCart(newItems);
        }

        let newUserInfo = JSON.parse(sessionStorage.getItem("userInfo") as any);
        
        setUserInfo(newUserInfo);
        
    }, []);

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
            return Object.values(cart).map((item: any, key: number) => {
                return (
                    <Stack spacing={4} mt={2} key={key}>
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
                total,
                balance: userInfo.balance
            }

            if(total > userInfo?.balance){
                setSnack({
                    severity: 'error',
                    message: 'Insufficient balance to pay for this order!',
                })
                setOpen(true);
            } else {
                if(subscription === 'no') {
                    orderFunc(data);
                } else {
                    let membership_data = {
                        cid: userInfo.cid,
                        membership_expire_date: subscription === 'monthly' ?  
                        moment().add(1, 'month').format('YYYY-MM-DD H:mm:ss') : 
                        moment().add(1, 'year').format('YYYY-MM-DD H:mm:ss')
                    }
                    membership(membership_data).then((res: any) => {
                        orderFunc(data);
                    }).catch((err: any) => {
                        setSnack({
                            severity: 'error',
                            message: err.message,
                        })
                        setOpen(true);
                    });
                }
            }
        }
    };

    const orderFunc = (data: any) => {
        order(data).then((res: any) => {
            setSnack({
                severity: 'success',
                message: 'Ordered successfully!',
            })
            setOpen(true);

            getCustomer({
                cid: userInfo.cid,
            }).then((customer) => {
                sessionStorage.setItem('userInfo', JSON.stringify(customer));
                setUserInfo(customer);
                setTimeout(() => {
                    sessionStorage.removeItem('cart');
                    sessionStorage.removeItem('itemsCount');
                    window.location.href = '/orderList';
                }, 2000);
            });
        })
    };

    const [open, setOpen] = useState(false);

    const [snack, setSnack] = useState<mySnackbar>({
        severity: 'success',
        message: '',
    });

    const handleClose = () => {
        setOpen(false);
    }

    const checkout = () => {
        if(isEmpty(cart)) {
            return <></>;
        }
        if(userInfo.membership && moment(userInfo?.membership_expire_date).diff(moment()) > 0) {
            return <>
            <Stack mt={2} spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
                <Typography variant='body1'>Discount</Typography>
                <Typography variant='h5'>${discount}</Typography>
            </Stack>
            <Stack mt={2} spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
                <Typography variant='h5'>Total</Typography>
                <Typography variant='h5'>${total.toFixed(2)}</Typography>
            </Stack>
            <Button onClick={() => {submitOrder()}} sx={{ mt: 2 }} fullWidth variant="contained">Proceed To Payment</Button>
        </>
        }
        return <>
            {subscription === 'no' && <Stack mt={2} spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
                <Typography variant='body1'>Delivery fee</Typography>
                <Typography variant='h5'>${delivery_fee}</Typography>
            </Stack>}
            {subscription !== 'no' && <Stack mt={2} spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
                <Typography variant='body1'>Membership fee</Typography>
                <Typography variant='h5'>${membershipFee}</Typography>
            </Stack>}
            {subscription !== 'no' && <Stack mt={2} spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
                <Typography variant='body1'>Discount</Typography>
                <Typography variant='h5'>${discount}</Typography>
            </Stack>}
            <Stack mt={2} spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
                <Typography variant='h5'>Total</Typography>
                <Typography variant='h5'>${total.toFixed(2)}</Typography>
            </Stack>
            <Button onClick={() => {submitOrder()}} sx={{ mt: 2 }} fullWidth variant="contained">Proceed To Payment</Button>
        </>
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
                            <Divider></Divider>
                        </Box>
                        <Box>
                            <Typography variant="h5" color={ORANGE}>Membership subscription</Typography>
                            <FormControl>
                                {userInfo?.membership ? 
                                <Stack pt={2} pb={2} spacing={2}>
                                    <Typography>Your membership is active</Typography>
                                    <Typography>Expire at: {moment(userInfo?.membership_expire_date).format('YYYY-MM-DD H:mm:ss')} </Typography>
                                </Stack>: 
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="no"
                                    name="radio-buttons-group"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel color="white" value="monthly" control={<Radio />} label="Monthly" />
                                    <FormControlLabel color="white" value="annually" control={<Radio />} label="Annually" />
                                    <FormControlLabel color="white" value="no" control={<Radio />} label="No subscription" />
                                </RadioGroup>}
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
                    {checkout()}
                </Box>
            </Box>
        </Box>
    )
};

export default CartPage;
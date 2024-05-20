import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Snackbar, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import search_bg from '../images/search_bg.jpeg';
import TitleAndSearch from "../component/TitleAndSearch.component";
import { searchInputs } from "../component/searchForm.component";
import { cancelOrder, getAllOrderList, getOrderList, getRestaurantOrderList, restaurantCompleteOrder, restaurantConfirmOrder, restaurantDeliveringOrder, restaurantProcessedOrder } from "../service/api";
import { isEmpty } from "lodash";
import NoResult from "../component/noResult.component";
import CheckIcon from '@mui/icons-material/Check';
import { mySnackbar } from "./login.page";
import { DELIVERY_TIME } from "../utils/constant";

const OrderList = () => {

    const session = JSON.parse(sessionStorage.getItem("userInfo") as any);

    const [tab, setTab] = useState(session.type === 'deliveryPerson' ? 'processed' : 'all');

    const [userInfo, setUserInfo] = useState() as any;

    const [list, setList] = useState() as any[];

    const [open, setOpen] = useState(false);

    const [snack, setSnack] = useState<mySnackbar>({
        severity: 'success',
        message: '',
    });

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e: any, value: string) => {
        console.log(value);
        setTab(value);
    };

    const onSubmit = (value: searchInputs) => {

        const userInfo: any = JSON.parse(sessionStorage.getItem("userInfo") as any);

        if (!userInfo) {
            window.location.href = '/auth/login';
            return;
        };

        window.location.href = `/search?name=${value.name}&distance=${value.distance}`;
    };

    useEffect(() => {

        let newUserInfo = JSON.parse(sessionStorage.getItem("userInfo") as any);
        
        setUserInfo(newUserInfo);
        
    }, []);

    const isCustomer = userInfo?.type === 'customers';
    const isRestaurant = userInfo?.type === 'restaurants';
    const isDelivery= userInfo?.type === 'deliveryPerson';


    useEffect(() => {
        // status
        // submitted -> processing -> processed -> delivering -> completed
        if(userInfo) {
            if(isCustomer) {
                let data = {
                    cid: userInfo.cid,
                    status: tab
                };
                getOrderList(data).then((res: any) => {
                    setList(res);
                });
            } else if(isRestaurant) {
                let data = {
                    rid: userInfo.rid,
                    status: tab
                };
                getRestaurantOrderList(data).then((res: any) => {
                    setList(res);
                });
            } else {
                let data = {
                    status: tab
                };
                getAllOrderList(data).then((res: any) => {
                    setList(res);
                });
            }
        }

    }, [userInfo, tab]);

    const confirm = (oid: number) => {
        let data = {
            oid
        };

        restaurantConfirmOrder(data).then((res: any) => {
            setSnack({
                severity: 'success',
                message: res.message,
            })
            setOpen(true);
        }).catch((err) => {
            setSnack({
                severity: 'error',
                message: err.message,
            })
            setOpen(true);
        });
    }

    const cancel = (item: any) => {
        console.log(item);
        let data = {
            oid: item.oid,
            total_price: item.total_price,
            cid: item.customer_id,
        };

        cancelOrder(data).then((res: any) => {
            setSnack({
                severity: 'success',
                message: res.message,
            })
            setOpen(true);
        }).catch((err) => {
            setSnack({
                severity: 'error',
                message: err.message,
            })
            setOpen(true);
        });
    }

    const processed = (oid: number) => {

        restaurantProcessedOrder({oid}).then((res: any) => {
            setSnack({
                severity: 'success',
                message: res.message,
            })
            setOpen(true);
        }).catch((err) => {
            setSnack({
                severity: 'error',
                message: err.message,
            })
            setOpen(true);
        });

    }

    const delivering = (oid: number) => {

        let data = {
            oid,
            did: userInfo?.did
        }

        restaurantDeliveringOrder(data).then((res: any) => {
            setSnack({
                severity: 'success',
                message: res.message,
            })
            setOpen(true);
        }).catch((err) => {
            setSnack({
                severity: 'error',
                message: err.message,
            })
            setOpen(true);
        });

    }

    const complete = (oid: number) => {

        restaurantCompleteOrder({oid}).then((res: any) => {
            setSnack({
                severity: 'success',
                message: res.message,
            })
            setOpen(true);
        }).catch((err) => {
            setSnack({
                severity: 'error',
                message: err.message,
            })
            setOpen(true);
        });

    };

    const goToDetails = (item: any) => {
        window.location.href = `/orderDetails?oid=${item.oid}`;
    };

    const renderList = () => {
        if(!isEmpty(list)) {
            return list.map((item: any, key: number) => {
                const img = item.image || '/images/res_default.png';
                const items = JSON.parse(item.items);
                const time = new Date(item.order_time).toLocaleString('en-AU', { timeZone: 'Australia/Sydney'});
                const finish_time = new Date(item?.finish_time).toLocaleString('en-AU', { timeZone: 'Australia/Sydney'});
                return (
                    <Card key={key} sx={{ maxWidth: 1200, padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <CardMedia image={img} sx={{ height: '250px', width: '250px' }} />
                        <CardContent sx={{ minWidth: '200px' }}>
                            <Stack spacing={2}>
                                <Typography sx={{ cursor: 'pointer', ":hover": { 'text-decoration': 'underline' } }} onClick={() => goToDetails(item)} variant="h6" component='span'>Order ID: {item.oid}</Typography>
                                <Typography variant="h6" component='span'>Restaurant Name: {item.title}</Typography>
                            </Stack>
                            <Stack spacing={2}>
                                <Typography maxWidth={600} variant="subtitle1">{item.description}</Typography>
                                <Typography variant="body1">Total price: ${item.total_price}</Typography>
                                <Stack spacing={2} direction='row'>
                                    <Typography variant="body1" component='span'>Order Time: {time}</Typography>
                                    {item.finish_time ? <Typography variant="body1" component='span'>Completed Time: {finish_time}</Typography>
                                    : <Typography variant="body1" component='span'>Estimate time: {item.estimate_time + DELIVERY_TIME} min</Typography>}
                                </Stack>
                            </Stack>
                        </CardContent>
                        <CardContent sx={{ minWidth: '200px' }}>
                            <Typography variant="h6">Items List:</Typography>
                            <ul>
                                {items.map((dish: any, key: number) => {
                                    return <li key={key}>
                                        <Typography variant="body2">{dish.name} x {dish.count}</Typography>
                                    </li>
                                })}
                            </ul>
                        </CardContent>
                        
                        {isRestaurant && item.status === 'submitted' && <CardActions>
                            <Button startIcon={<CheckIcon></CheckIcon>} onClick={() => confirm(item.oid)}>Confirm</Button>
                        </CardActions>}
                        {isRestaurant && item.status === 'submitted' && <CardActions>
                            <Button startIcon={<CheckIcon></CheckIcon>} onClick={() => cancel(item)}>Cancel</Button>
                        </CardActions>}
                        {isRestaurant && item.status === 'processing' && <CardActions>
                            <Button startIcon={<CheckIcon></CheckIcon>} onClick={() => processed(item.oid)}>Processed</Button>
                        </CardActions>}
                        {isDelivery && item.status === 'processed' && <CardActions>
                            <Button startIcon={<CheckIcon></CheckIcon>} onClick={() => delivering(item.oid)}>Start delivering</Button>
                        </CardActions>}
                        {isDelivery && item.status === 'delivering' && <CardActions>
                            <Button startIcon={<CheckIcon></CheckIcon>} onClick={() => complete(item.oid)}>Completed</Button>
                        </CardActions>}
                    </Card>
                );
            });
        }
        return <NoResult/>
    };

    console.log(tab)

    return (
        <Box sx={{ width: '100%',  background: `url(${search_bg})`, backgroundSize: 'cover'}}>
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
            <Container maxWidth='xl'>
                <TitleAndSearch
                    onSubmit={onSubmit}
                />
                <Container >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs sx={{ color: 'white' }} value={tab} onChange={handleChange} aria-label="basic tabs example">
                            {(isCustomer || isRestaurant) && <Tab sx={{ color: 'white' }} color='white' label="All" value='all'></Tab>}
                            {(isCustomer || isRestaurant) && <Tab sx={{ color: 'white' }} label="Submitted" value='submitted'></Tab>}
                            {(isCustomer || isRestaurant) && <Tab sx={{ color: 'white' }} label="Processing" value='processing'></Tab>}
                            <Tab sx={{ color: 'white' }} label="Processed" value='processed'></Tab>
                            <Tab sx={{ color: 'white' }} label="Delivering" value='delivering'></Tab>
                            <Tab sx={{ color: 'white' }} label="Completed" value='completed'></Tab>
                            {(isCustomer || isRestaurant) && <Tab sx={{ color: 'white' }} label="Canceled" value='canceled'></Tab>}
                        </Tabs>
                    </Box>
                    <Stack spacing={4} mt={4} mb={4}>
                        {renderList()}
                    </Stack>
                </Container>
            </Container>
        </Box>
    );
};

export default OrderList;
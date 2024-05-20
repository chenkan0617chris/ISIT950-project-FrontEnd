import { Alert, Box, Button, Card, CardContent, CardMedia, Container, Divider, Snackbar, Stack, Typography } from "@mui/material";
import search_bg from '../images/search_bg.jpeg';
import { WHITE } from "../utils/constant";
import { searchInputs } from "../component/searchForm.component";
import TitleAndSearch from "../component/TitleAndSearch.component";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useSearchParams } from "react-router-dom";
import { getMenus, getRestaurant } from "../service/api";
import { mySnackbar } from "./login.page";
import EditIcon from '@mui/icons-material/Edit';
import NoResult from "../component/noResult.component";
import { isEmpty } from "lodash";

export interface menuInterface {
    
};

const RestaurantPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [userInfo, setUserInfo] = useState<any>();

    useEffect(() => {

        let newUserInfo = JSON.parse(sessionStorage.getItem("userInfo") as any);
        
        setUserInfo(newUserInfo);
        
    }, []);

    const onSubmit = (value: searchInputs) => {

        if (!userInfo) {
            window.location.href = '/auth/login';
            return;
        };

        window.location.href = `/search?name=${value.name}&distance=${value.distance}`;
    };

    const [menus, setMenus] = useState<any[]>();

    const [restaurant, setRestaurant] = useState<any>();


    const addToCart = (menu: any) => {

        let cart = JSON.parse(sessionStorage.getItem("cart") as any)  || {};
        let itemsCount = JSON.parse(sessionStorage.getItem("itemsCount") as any) || 0;

        let current_res = Object.values(cart) as any;

        if(!isEmpty(cart) && current_res[0]?.title !== restaurant.title) {
            cart = {};
            itemsCount = 0;
        }


        if(cart[menu.mid]) {
            cart[menu.mid].count++;
        } else {
            cart[menu.mid] = {
                ...menu,
                count: 1
            }
        }
        itemsCount++;

        sessionStorage.setItem("cart", JSON.stringify(cart));
        sessionStorage.setItem("itemsCount", JSON.stringify(itemsCount));


        setSnack({
            severity: 'success',
            message: 'Added to cart successfully!',
        })
        setOpen(true);
        
    };

    const edit = (menu: any) => {
        window.location.href = `/addDish?mid=${menu.mid}&name=${menu.name}&description=${menu.description}&price=${menu.price}`
        console.log(menu);
    };

    const [open, setOpen] = useState(false);

    const [snack, setSnack] = useState<mySnackbar>({
        severity: 'success',
        message: '',
    });

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const title = searchParams.get('title');

        if (title) {
            getRestaurant(title).then((restaurant) => {
                setRestaurant(restaurant[0]);
            });

            getMenus(title).then((res) => {
                setMenus(res);
            });
        }

    }, []);

    const img_url = restaurant?.image || '/images/res_default.png';

    const distance = restaurant && restaurant?.postcode - Number(JSON.parse(sessionStorage.getItem('userInfo') as any)['postcode']);


    const renderMenus = () => {
        if(menus && menus.length > 0) {
            return menus?.map((menu: any, key: number) => {
                const img_url = menu?.image || '/images/dish1.png';
                return (
                    <Stack key={key} spacing={2} direction='row' p={2} sx={{ justifyContent: 'space-between', width: '100%' }}>
                        <Stack sx={{ color: WHITE }}>
                            <Typography variant="h4">{menu.name}</Typography>
                            <Typography mt={2} variant="body2">${menu.price}</Typography>
                            <Typography mt={2} variant="body1">{menu.description}</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <img alt="" src={img_url} width={160} height={160}></img>
                            {userInfo?.type === 'customers' ? 
                            <Button sx={{ ml: 2 }} variant="contained" onClick={() => addToCart(menu)}  startIcon={<AddIcon sx={{ color: WHITE }}></AddIcon>}>Add</Button> 
                            : <Button sx={{ ml: 2 }} variant="contained" onClick={() => edit(menu)} startIcon={<EditIcon sx={{ color: WHITE }}></EditIcon>}>Edit</Button>}
                        </Stack>
                    </Stack>
                )
            })
        } 
        return <NoResult></NoResult>;
    };

    return (
        <Box sx={{ width: '100%',  background: `url(${search_bg})`, backgroundSize: 'cover'}}>
            <Container maxWidth='xl'>
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
                {userInfo?.type === 'customers' && <TitleAndSearch
                    onSubmit={onSubmit}
                />}
                <Stack spacing={4} p={6}>
                    <Card sx={{ padding: '25px', display: 'flex', alignItems: 'center', background: '#202020', opacity: 0.8, borderRadius: 2}}>
                        <CardMedia image={img_url} sx={{ height: 130, width: 270, mr: 4}} />
                        <CardContent sx={{ color: WHITE }}>
                            <Stack spacing={2}>
                                <Typography  variant="h6">{restaurant?.title}</Typography>
                                <Typography variant="subtitle1">{restaurant?.description}</Typography>
                            </Stack>
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <Typography>${restaurant?.avgPrice || 20}</Typography>
                                <Typography>{distance}min</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Stack direction='row' p={4} spacing={4} sx={{ background: '#202020', opacity: 0.8, borderRadius: 2 }}>
                        <Stack spacing={2} width='100%'>
                        {renderMenus()}
                        </Stack>
                    </Stack>
                </Stack>
            </Container>

        </Box>)
};

export default RestaurantPage;
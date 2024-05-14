import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import search_bg from '../images/search_bg.jpeg';
import RestaurantCard from "../component/restaurantCard.component";
import { ORANGE, WHITE } from "../utils/constant";
import Subtitle from "../component/subtitle.component";
import Title from "../component/title.component";
import SearchForm from "../component/searchForm.component";
import TitleAndSearch from "../component/TitleAndSearch.component";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

const fakeData = {
    title: 'Paneer Tikka Rice Bowl',
    description: 'The Good Bowl',
    image: './images/dish1.png',
    price: 200,
    distance: 20
}

const RestaurantPage = () => {

    const [tab, setTab] = useState();

    const handleSubmit = () => {

    };

    const handleChangeTab = (event: React.SyntheticEvent, newValue: any) => {
        setTab(newValue);
    };

    const { title, description, image, price, distance } = fakeData;

    return (
        <Box sx={{ width: '100%',  background: `url(${search_bg})`, backgroundSize: 'cover'}}>
            <TitleAndSearch />
            <Stack spacing={4} p={6}>
                <Card sx={{ padding: '25px', display: 'flex', alignItems: 'center', background: '#202020', opacity: 0.8 }}>
                    <CardMedia image={image} sx={{ height: 130, width: 270, mr: 4}} />
                    <CardContent sx={{ color: WHITE }}>
                        <Stack spacing={2}>
                            <Typography  variant="h6">{title}</Typography>
                            <Typography variant="subtitle1">{description}</Typography>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography>${price}</Typography>
                            <Typography>{distance}min</Typography>
                        </Stack>
                    </CardContent>
                </Card>
                <Stack direction='row' p={4} spacing={4} sx={{ background: '#202020', opacity: 0.8 }}>
                    <Tabs
                        orientation="vertical"
                        value={tab}
                        onChange={handleChangeTab}
                    >
                        <Tab sx={{ color: WHITE }} label="Recommended" value='Recommended'></Tab>
                        <Tab sx={{ color: WHITE }} label="Breakfast Box" value='Breakfast Box'></Tab>
                        <Tab sx={{ color: WHITE }} label="Lunch" value='Lunch'></Tab>
                    </Tabs>
                    <Stack spacing={2} direction='row' p={2}>
                        <Stack sx={{ color: WHITE }}>
                            <Typography variant="h4">Brunch for 2 - Veg (Save upto Rs.45)</Typography>
                            <Typography mt={2} variant="body2">$599</Typography>
                            <Typography mt={2} variant="body1">Brunch: One meal to rule them all! Grab this mega saver combo with your choice of 2 veg wraps, Aloo Paratha (2 pcs), chole and Curd lunchbox and 2 choco lava cakes. This is just bliss on a plate!</Typography>
                        </Stack>
                        <img alt="" src='./images/dish1.png' width={160} height={160}></img>
                        <Button variant="contained"  startIcon={<AddIcon sx={{ color: WHITE }}></AddIcon>}>Add</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>)
};

export default RestaurantPage;
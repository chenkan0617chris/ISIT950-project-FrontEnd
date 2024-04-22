import { Box, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import Title from "../component/title.component";
import Subtitle from "../component/subtitle.component";
import SearchForm from "../component/searchForm.component";
import RestaurantCard, { Restaurant } from "../component/restaurantCard.component";
import { WHITE } from "../utils/constant";
import search_bg from '../images/search_bg.jpeg';

const fakeData = [
    {
        title: 'Paneer Tikka Rice Bowl',
        description: 'The Good Bowl',
        image: './images/dish1.png',
        price: 200,
        distance: 20
    },
    {
        title: 'Paneer Tikka Rice Bowl',
        description: 'The Good Bowl',
        image: './images/dish1.png',
        price: 200,
        distance: 20
    },
    {
        title: 'Paneer Tikka Rice Bowl',
        description: 'The Good Bowl',
        image: './images/dish1.png',
        price: 200,
        distance: 20
    },
    {
        title: 'Paneer Tikka Rice Bowl',
        description: 'The Good Bowl',
        image: './images/dish1.png',
        price: 200,
        distance: 20
    },
    {
        title: 'Paneer Tikka Rice Bowl',
        description: 'The Good Bowl',
        image: './images/dish1.png',
        price: 200,
        distance: 20
    },
    {
        title: 'Paneer Tikka Rice Bowl',
        description: 'The Good Bowl',
        image: './images/dish1.png',
        price: 200,
        distance: 20
    },
];

const SearchResult = () => {

    const handleClick = () => {

    };

    const onSubmit = () => {

    };

    return (
        <Box sx={{ width: '100%',  background: `url(${search_bg})`, backgroundSize: 'cover'}}>
            <Stack spacing={4} p={6} direction={"row"} justifyContent='space-between'>
                <Stack spacing={2}>
                    <Title></Title>
                    <Subtitle></Subtitle>
                </Stack>
                <Stack spacing={2} p={3} mt={4}>
                    <SearchForm
                        onSubmit={onSubmit}
                    />
                </Stack>
            </Stack>
            <Stack spacing={4} p={6}>
                <Stack spacing={2}>
                    <Typography color={WHITE}>Search results for “ Rice Bowls”</Typography>
                </Stack>
                <Grid container spacing={4}>
                    {fakeData.map((restaurant: Restaurant, index) => {
                        return (
                            <Grid item  key={index}>
                                <RestaurantCard
                                    restaurant={restaurant}
                                    handleClick={handleClick}
                                />
                            </Grid>
                                
                        )
                    })}
                </Grid>
            </Stack>
        </Box>
    )
};

export default SearchResult;
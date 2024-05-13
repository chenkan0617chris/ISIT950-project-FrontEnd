import { Box, Grid, Stack, Typography } from "@mui/material";
import Title from "../component/title.component";
import Subtitle from "../component/subtitle.component";
import SearchForm from "../component/searchForm.component";
import RestaurantCard, { Restaurant } from "../component/restaurantCard.component";
import { WHITE } from "../utils/constant";
import search_bg from '../images/search_bg.jpeg';
import TitleAndSearch from "../component/TitleAndSearch.component";

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
        window.location.href = '/restaurant';
    };

    const handleSubmit = () => {

    };

    return (
        <Box sx={{ width: '100%',  background: `url(${search_bg})`, backgroundSize: 'cover'}}>
            <TitleAndSearch />
            <Stack spacing={4} p={6}>
                <Stack spacing={2}>
                    <Typography color={WHITE}>Search results for “ Rice Bowls”</Typography>
                </Stack>
                <Grid container spacing={4}>
                    {fakeData.map((restaurant: Restaurant, index) => {
                        return (
                            <Grid item key={index}>
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
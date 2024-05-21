import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { searchInputs } from "../component/searchForm.component";
import RestaurantCard, { Restaurant } from "../component/restaurantCard.component";
import { WHITE } from "../utils/constant";
import search_bg from '../images/search_bg.jpeg';
import TitleAndSearch from "../component/TitleAndSearch.component";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { search } from "../service/api";
import { isEmpty } from "lodash";
import NoResult from "../component/noResult.component";

const SearchResult = () => {

    const [searchParams] = useSearchParams();

    const [results, setResults] = useState<Restaurant[]>();

    const name = searchParams.get("name");

    const distance = searchParams.get("distance");

    const category = searchParams.get("category") as any;

    const rating = searchParams.get("rating") as any;

    const [searchTerm, setSearchTerm] = useState('All');


    const handleClick = (restaurant: Restaurant) => {
        window.location.href = `/restaurant?title=${restaurant.title}`;
    };

    const onSubmit = (value: searchInputs) => {
        const userInfo: any = JSON.parse(sessionStorage.getItem("userInfo") as any);

        if (!userInfo) return;

        search({
            name: value.name,
            distance: Number(value.distance),
            category: value.category,
            rating: value.rating,
            postcode: userInfo.postcode
        }).then((res) => {
            if(value.name) {
                setSearchTerm(value.name);
            } else {
                setSearchTerm('All');
            }
            setResults(res);
        });
    };


    useEffect(() => {
        let form: searchInputs = {};

        if (name) {
            form['name'] = name;
        }
        if (distance) {
            form['distance'] = Number(distance);
        }

        form = {
            ...form,
            category,
            rating
        }

        onSubmit(form);
    }, [category, distance, name, rating]);

    const renderResult = () => {
        if(!isEmpty(results)) {
            return results?.map((restaurant: Restaurant, index) => {
                return (
                    <Grid item key={index} width='100%'>
                        <RestaurantCard
                            restaurant={restaurant}
                            handleClick={() => {
                                handleClick(restaurant);
                            }}
                        />
                    </Grid>
                )
            })
        }
        return <NoResult></NoResult>
    };

    return (
        <Box sx={{ width: '100%',  background: `url(${search_bg})`, backgroundSize: 'cover'}}>
            <Container maxWidth="xl">
                <TitleAndSearch
                    onSubmit={onSubmit}
                />
                <Stack spacing={4} p={6}>
                    <Stack spacing={2}>
                        <Typography color={WHITE}>Search results for “{searchTerm}”</Typography>
                    </Stack>
                    <Grid container spacing={4}>
                        {renderResult()}
                    </Grid>
                </Stack>
            </Container>
        </Box>
    )
};

export default SearchResult;
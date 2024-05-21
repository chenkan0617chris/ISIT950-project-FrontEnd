import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DELIVERY_TIME } from "../utils/constant";

export interface Restaurant {
    title: string;
    description?: string;
    image: string;
    price: number;
    postcode: number;
}

interface RestaurantCardProps {
    handleClick: () => void;
    restaurant: Restaurant
}

const RestaurantCard = (props: RestaurantCardProps) => {

    const { handleClick, restaurant } = props;

    const { title, description, image, price, postcode } = restaurant;

    const distance = postcode - Number(JSON.parse(sessionStorage.getItem('userInfo') as any)['postcode']);

    const img_url = image || '/images/res_default.png';

    return (
        <Card sx={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box display='flex' alignItems='center'>
                <CardMedia image={img_url} sx={{ height: '128px', width: '128px' }}>
                </CardMedia>
                <CardContent sx={{ maxWidth: '70%' }}>
                    <Stack spacing={2}>
                        <Typography variant="h6">{title}</Typography>
                        <Typography  variant="body1" sx={{ height: '50px', overflow: "hidden" }}>{description}</Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography>${price || 20}</Typography>
                        <Typography>{distance + DELIVERY_TIME}min</Typography>
                    </Stack>
                    
                </CardContent>
            </Box>
            <CardActions>
                <Button startIcon={<ArrowForwardIosIcon></ArrowForwardIosIcon>} onClick={() => handleClick()}></Button>
            </CardActions>
        </Card>
    )
};

export default RestaurantCard;
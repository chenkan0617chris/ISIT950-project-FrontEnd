import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface Restaurant {
    title: string;
    description?: string;
    image: string;
    price?: number;
    distance: number;
}

interface RestaurantCardProps {
    handleClick: () => void;
    restaurant: Restaurant
}

const RestaurantCard = (props: RestaurantCardProps) => {

    const { handleClick, restaurant } = props;

    const { title, description, image, price, distance } = restaurant;

    return (
        <Card sx={{ maxWidth: 500, padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <CardMedia image={image} sx={{ height: '128px', width: '128px' }}>

            </CardMedia>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="subtitle1">{description}</Typography>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography>${price}</Typography>
                    <Typography>{distance}min</Typography>
                </Stack>
                
            </CardContent>
            <CardActions>
                <Button onClick={handleClick}><ArrowForwardIosIcon></ArrowForwardIosIcon></Button>
            </CardActions>
        </Card>
    )
};

export default RestaurantCard;
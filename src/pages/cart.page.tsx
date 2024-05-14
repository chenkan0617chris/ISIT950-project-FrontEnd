import { Box, Container, Stack, Typography } from "@mui/material";
import TitleAndSearch from "../component/TitleAndSearch.component";
import { WHITE } from "../utils/constant";

const CartPage = () => {
    return (
        <Box sx={{ width: '100%',  background: `url(./images/cart_bg.png)`, backgroundSize: 'cover'}}>
            <TitleAndSearch />
            <Box sx={{ background: WHITE }}>
                <Stack spacing={2}>
                    <Typography variant="h2">Cart</Typography>
                    <Typography variant="body1">2 alignItems</Typography>
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="body1">Brunch for 2 - Veg</Typography>
                    <Typography variant="body1">$599</Typography>
                </Stack>
            </Box>
        </Box>
    )
};

export default CartPage;
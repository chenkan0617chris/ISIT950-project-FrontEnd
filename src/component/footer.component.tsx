import { Box, Container, Link, Stack, Typography } from "@mui/material";
import Title from "./title.component";
import BeMember from "./beMember.component";
import { RED, WHITE } from "../utils/constant";

const Footer = () => {
    return (
        <Box pt={4} pb={4} sx={{ background: RED, width: '100%'}}>
            <Stack spacing={0} flexDirection='row' justifyContent='space-around'>
                <Stack spacing={2}>
                    <Title size={48} color='#ffffff'></Title>
                    <BeMember></BeMember>
                </Stack>
                <Stack spacing={2} direction='row' m={0} useFlexGap alignItems='center'>
                    <Link href='/' color={WHITE}>About Us</Link>
                    <Link href='/' color={WHITE}>Delivery</Link>
                    <Link href='/' color={WHITE}>Help & Support</Link>
                    <Link href='/' color={WHITE}>T&C</Link>
                </Stack>
                <Stack spacing={2} justifyContent='center'>
                    <Typography  color={WHITE} variant="h6">Contact: +123456789</Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Footer;
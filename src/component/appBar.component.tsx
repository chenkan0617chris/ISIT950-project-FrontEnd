import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { RED } from "../utils/constant";

const MyAppBar = () => {

    const appBar = ['Tracking', 'Menu', 'History', 'Cart', 'Membership', 'Home', 'About', 'Contact', 'login'];

    const handleAppBarClick = (page: string) => {
        switch (page) {
            case 'Home':
                window.location.href = '/';
                return;
            case 'login':
                window.location.href = 'auth/login';
                return;
            default:
                return;
        }
    };

    return (
        <AppBar position="sticky" sx={{ background: RED }}>
            <Container>
                <Toolbar disableGutters>
                    <Box>
                        {appBar.map(page => {
                            return (
                                <Button
                                    sx={{ color: 'white' }}
                                    key={page}
                                    onClick={() => handleAppBarClick(page)}
                                >
                                    {page}
                                </Button>
                            )
                        })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        )
};


export default MyAppBar;

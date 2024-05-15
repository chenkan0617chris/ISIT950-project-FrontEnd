import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { RED } from "../utils/constant";

const MyAppBar = () => {
    let appBar;
    // const appBar = ['Tracking', 'Menu', 'History', 'Cart', 'Membership', 'Home', 'About', 'Contact', 'login'];

    if(sessionStorage.getItem('userInfo')){
        appBar = ['Home', 'Search', 'History', 'Cart', 'Membership', 'logout'];
    } else {
        appBar = ['Home', 'Search', 'History', 'Cart', 'Membership', 'login'];
    }

    const handleAppBarClick = (page: string) => {
        if(!sessionStorage.getItem('userInfo')) {
            window.location.href = '/auth/login';
            return;
        }
        switch (page) {
            case 'Home':
                window.location.href = '/';
                return;
            case 'login':
                window.location.href = '/auth/login';
                return;
            case 'logout':
                sessionStorage.clear();
                window.location.href = '/auth/login';
                return;
            case 'Search':
                window.location.href = '/search';
                return;
            case 'Cart':
                window.location.href = '/cart';
                return;
            case 'History':
                window.location.href = '/history';
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

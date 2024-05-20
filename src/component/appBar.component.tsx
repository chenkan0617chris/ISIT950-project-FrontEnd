import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { RED } from "../utils/constant";
import { useEffect, useState } from "react";

const MyAppBar = () => {

    const [userInfo, setUserInfo] = useState<any>();

    const [appBar, setAppBar] = useState<any[]>(['Home', 'Search', 'Order List', 'Cart', 'Setting', 'login']);

    useEffect(() => {
        const userInfo = sessionStorage.getItem('userInfo');

        if (!userInfo) return;

        setUserInfo(JSON.parse(userInfo));
    }, []);

    useEffect(() => {
        if(userInfo) {
            if(userInfo?.type === 'customers') {
                setAppBar(['Home', 'Search', 'Order List', 'Cart', 'Setting', 'logout']);
            } else if(userInfo?.type === 'restaurants') {
                setAppBar(['Home', 'Order List', 'Menu', 'Add dish', 'Setting', 'logout']);
            } else {
                setAppBar(['Home', 'Order List', 'logout']);
            }
        } else {
            setAppBar(['Home', 'Search', 'Order List', 'Cart', 'Setting', 'login']);
        }
        

    }, [userInfo]);
    


    const handleAppBarClick = (page: string) => {
        if(!userInfo) {
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
            case 'Setting':
                window.location.href = '/setting';
                return;
            case 'Order List':
                window.location.href = '/orderList';
                return;
            case 'Add dish':
                window.location.href = '/addDish';
                return;
            case 'Menu':
                window.location.href = `/restaurant?title=${userInfo?.title}`;
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

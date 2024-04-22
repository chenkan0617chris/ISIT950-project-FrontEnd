import { Box } from "@mui/material";
import { useEffect } from "react";
import MyAppBar from "./appBar.component";
import Footer from "./footer.component";

interface LayoutProps {
    children: React.ReactNode;
  }

export default function Layer({ children } : LayoutProps) {

    useEffect(() => {

        let loginURL = 'auth/login';
        // if(window.location.pathname !== loginURL && !localStorage.getItem('userInfo')) {
        //     window.location.href = '/';
        // }

    }, [])

    return (
        <Box sx={{ position: 'absolute', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <MyAppBar></MyAppBar>
            {children}
            <Footer></Footer>
        </Box>
    )
}
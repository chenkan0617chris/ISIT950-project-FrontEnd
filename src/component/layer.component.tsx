import { Box } from "@mui/material";
import MyAppBar from "./appBar.component";
import Footer from "./footer.component";

interface LayoutProps {
    children: React.ReactNode;
  }

export default function Layer({ children } : LayoutProps) {


    return (
        <Box sx={{ position: 'absolute', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <MyAppBar></MyAppBar>
            {children}
            <Footer></Footer>
        </Box>
    )
}
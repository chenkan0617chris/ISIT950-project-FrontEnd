import { Box, Typography } from "@mui/material";

const NoResult = () => {
    return <Box width='100%' height={120} textAlign='center' sx={{ background: 'black', opacity: 0.8 }} >
        <Typography sx={{ color: 'white', lineHeight: '120px', fontSize: '30px' }}>No Result</Typography>
    </Box>
};

export default NoResult;
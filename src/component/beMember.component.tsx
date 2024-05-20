import { Box, Typography } from "@mui/material";
import { RED } from "../utils/constant";

const BeMember = () => {
    return (
        <Box width={272} height={62} sx={{ background: 'white', borderRadius: '16px', textAlign: 'center' }}>
            <Typography lineHeight='62px' fontSize={36} color={RED} fontWeight={700}>Be a member</Typography>
        </Box>
    )
};

export default BeMember;
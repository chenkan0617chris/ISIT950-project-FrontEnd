import { Typography } from "@mui/material";
import { RED } from "../utils/constant";

interface TitleProps {
    size?: number;
}

const Subtitle = (props: TitleProps) => {

    const { size = 40 } = props;

    return (
        <Typography fontSize={size} color='white' fontFamily='Poppins'>Satisfy Your 
            <Typography component="span" fontSize={size} color={RED}> Craving</Typography> with a  
            <Typography component="span" fontSize={size} color={RED}> Click</Typography>
        </Typography>
    )
};

export default Subtitle;
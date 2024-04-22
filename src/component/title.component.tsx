import { Typography } from "@mui/material";

interface TitleProps {
    size?: number;
    color?: string;
}

const Title = (props: TitleProps) => {

    const { size = 100, color = '#F00' } = props;

    return (
        <Typography fontSize={size} color={color} fontFamily='Lily Script One' >Click N Crave</Typography>
    )
};

export default Title;
import { Stack } from "@mui/material";
import SearchForm, { searchInputs } from "./searchForm.component";
import Subtitle from "./subtitle.component";
import Title from "./title.component";

interface TitleAndSearchProps {
    onSubmit: (value: searchInputs) => void;
}

const TitleAndSearch = (props: TitleAndSearchProps) => {

    const { onSubmit } = props;

    return (
        <Stack spacing={4} p={6} direction={"row"} justifyContent='space-between'>
            <Stack spacing={2}>
                <Title></Title>
                <Subtitle></Subtitle>
            </Stack>
            <Stack spacing={2} p={3} mt={4}>
                <SearchForm
                    onSubmit={onSubmit}
                />
            </Stack>
        </Stack>
    )
};

export default TitleAndSearch;
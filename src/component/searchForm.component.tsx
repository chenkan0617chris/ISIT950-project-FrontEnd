import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { ALL_RESTAURANT_CATEGORY, RESTAURANT_RATING } from "../utils/constant";

export interface searchInputs {
    distance?: number;
    name?: string;
    category?: string;
    rating?: number;
};

interface SearchFormProps {
    onSubmit: (value: searchInputs) => void;
}

const SearchForm = (props: SearchFormProps) => {

    const { register, handleSubmit } = useForm<searchInputs>();

    const { onSubmit } = props;

    return (
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <Stack direction='row' justifyContent='center' alignItems='center'>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-name"
                            type='text'
                            placeholder="Search by name"
                            sx={{ 
                                background: '#9A1616',
                                minWidth: '400px',
                                color: '#FFFFFF',

                            }}
                            {...register('name')}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue='all'
                            label="Category"
                            sx={{ 
                                background: '#9A1616',
                                width: '120px',
                                color: '#FFFFFF',

                            }}
                            {...register('category')}
                        >   
                            {ALL_RESTAURANT_CATEGORY.map((value, index) => {
                                return <MenuItem key={index} value={value}>{value}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction='row' justifyContent='center' alignItems='center'>
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-distance"
                            type='number'
                            placeholder="Search by min"
                            sx={{ 
                                background: '#9A1616',
                                color: '#FFFFFF',
                                minWidth: '400px' 
                            }}
                            {...register('distance')}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={category}
                            label="Rating"
                            defaultValue={0}
                            sx={{ 
                                background: '#9A1616',
                                width: '120px',
                                color: '#FFFFFF',

                            }}
                            {...register('rating')}
                        >   
                            {RESTAURANT_RATING.map((value, index) => {
                                return <MenuItem key={index} value={value}>{value} star</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Stack>
                <Button sx={{ background: '#F88500', width: 200 }} type='submit' variant="contained">Search</Button>
            </Stack>
        </Box>
    )
};

export default SearchForm;
import { Box, Button, FormControl, OutlinedInput, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

interface Inputs {
    distance?: number;
    name?: string;
    
};

interface SearchFormProps {
    onSubmit: (value: Inputs) => void;
}

const SearchForm = (props: SearchFormProps) => {

    const { register, handleSubmit } = useForm<Inputs>();

    const { onSubmit } = props;

    return (
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <FormControl sx={{ m: 1 }} variant="outlined">
                    <OutlinedInput
                        required
                        id="outlined-adornment-name"
                        type='text'
                        placeholder="Search by name, category"
                        sx={{ 
                            background: '#9A1616',
                            minWidth: '400px',
                            color: '#FFFFFF',

                        }}
                        {...register('name')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined">
                    <OutlinedInput
                        required
                        id="outlined-adornment-distance"
                        type='text'
                        placeholder="Search by km, min"
                        sx={{ 
                            background: '#9A1616',
                            color: '#FFFFFF',
                            minWidth: '400px' 
                        }}
                        {...register('distance')}
                    />
                </FormControl>
                <Button sx={{ background: '#F88500', width: 200 }} type='submit' variant="contained">Search</Button>
            </Stack>
        </Box>
    )
};

export default SearchForm;
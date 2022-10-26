import * as React from 'react';
import { Container } from '@mui/system';
import { InputLabel, MenuItem, FormControl, Select} from '@mui/material'

export default function CauHoiDropdown(props) {
    const { levels, option } = props
    const getValue = props.propsFunc
    const [cauHoi, setCauHoi] = React.useState('');
    const handleChange = (event) => {
        setCauHoi(event.target.value);
        getValue(event.target.value)
};

    return (
        <Container>
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-simple-select-standard-label">{option}</InputLabel>
            <Select
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-standard"
            value={cauHoi}
            onChange={handleChange}
            autoWidth
            label={option}
            >
            <MenuItem value="">
                <em>{option}</em>
            </MenuItem>
                {levels.map((level) => {
                    return <MenuItem key={level} value={level}>{level}</MenuItem>
                })}
            </Select>
        </FormControl>
        </Container>
    );
}

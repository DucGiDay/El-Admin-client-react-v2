import * as React from 'react';
import { Container } from '@mui/system';
import { InputLabel, MenuItem, FormControl, Select} from '@mui/material'

export default function DanhMucDropdown(props) {
    const listDanhMuc = props.props
    const optionDanhMuc = props.danhMuc
    const getValue = props.propsFunc
    const defaultValue = props.defaultValue
    const [idDanhMuc, setIdDanhMuc] = React.useState(defaultValue ? defaultValue :'')
    const handleChange = (event) => {
        setIdDanhMuc(event.target.value);
        getValue(event.target.value)
};
    return (
    <Container>
        <FormControl   sx={{ m: 1, minWidth: 200}} size="small">
            <InputLabel id="demo-simple-select-standard-label">{optionDanhMuc}</InputLabel>
            <Select
                labelId="demo-simple-select-disabled-label"
                id="demo-simple-select-standard"
                value={idDanhMuc}
                onChange={handleChange}
                autoWidth
                label={optionDanhMuc}
                >
                <MenuItem value="">
                    <em>{optionDanhMuc}</em>
                </MenuItem>

                {listDanhMuc.map((danhMuc) => {
                    return <MenuItem key={danhMuc.id} value={danhMuc.id}>{danhMuc.Name}</MenuItem>
                })}
            </Select>
        </FormControl>
    </Container>
    );
}
import React from 'react'
import { Select } from 'antd';
const { Option } = Select;

function DropdownCauHoiV2({ listDanhMuc, title, getIdDanhMuc }) {
    //handle Select tag
    const onChange = (value) => {
        getIdDanhMuc(value);
    };
    return (
        <Select
            showSearch
            placeholder={title}
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
        {listDanhMuc.map((item, index) => {
            return  <Option value={item.id} key={index}>{item.Name}</Option>
        })}
        </Select>
    )
}

export default DropdownCauHoiV2
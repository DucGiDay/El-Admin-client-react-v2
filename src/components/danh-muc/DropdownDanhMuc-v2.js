import React from 'react'
import { Select } from 'antd';
const { Option } = Select;

function DropdownDanhMucV2(props) {
  const { listDanhMuc, title, getIdDanhMuc } = props
  const defaultDanhMuc = props.defaultDanhMuc ? props.defaultDanhMuc : ""
  
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
      defaultValue={defaultDanhMuc}
    >
      <Option value="" style={{opacity: "0.5"}}>{title }</Option>
      {listDanhMuc.map((item, index) => {
        return  <Option value={item.id} key={index}>{item.Name}</Option>
      })}
    </Select>
  )
}

export default DropdownDanhMucV2
import React from 'react'
import { Button} from 'antd';
import { Link } from 'react-router-dom'
function ButtonEdit({ id, danhMuc }) {
  let url = `dkt/${id}`
  if (danhMuc === 'Đơn Vị Kiến Thức') {
    url = `dvkt/${id}`
  } else if (danhMuc === 'Mô Tả Chi Tiết') {
    url = `chi-tiet/${id}`
  }
  return (
    <Link to={`${url}`}>
      <Button >Edit</Button>
    </Link>
  )
}

export default ButtonEdit
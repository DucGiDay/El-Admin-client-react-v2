import { Button} from 'antd';
import React from 'react';
import axios from 'axios';
import { NotificationManager} from 'react-notifications';


function ButtonDelete(props) {
  const id = props.props
  const danhMuc = props.danhMuc
  let url = `http://localhost:4000/api/dkt/${id}`
  if (danhMuc === 'Đơn Vị Kiến Thức') {
    url = `http://localhost:4000/api/dvkt/${id}`
  } else if (danhMuc === 'Mô Tả Chi Tiết') {
    url = `http://localhost:4000/api/chi-tiet/${id}`
  }
  const deleteDanhMucById = () => {
    axios
      .delete(url)
      .then(
        NotificationManager.success('Xóa thành công'),
        window.location.reload(false)
      )
  }
  return (
    <Button onClick={deleteDanhMucById} danger>Delete</Button>
  )
}

export default ButtonDelete
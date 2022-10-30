import EditDKT from 'components/danh-muc/EditDKT'
import EditDVKT from 'components/danh-muc/EditDVKT'
import EditMTCT from 'components/danh-muc/EditMTCT'
import React from 'react'
import { useParams } from 'react-router-dom'

function EditDanhMuc({danhMuc}) {
  const { id } = useParams()
  let url = `http://localhost:4000/api/dkt/${id}`
  const editDanhMuc = () => {
    if (danhMuc === 'Đơn Vị Kiến Thức') {
      url = `http://localhost:4000/api/dvkt/${id}`
      return (<EditDVKT url={url} />)
    } else if (danhMuc === 'Mô Tả Chi Tiết'){
      url = `http://localhost:4000/api/chi-tiet/${id}`
      return (<EditMTCT url={url} />)
    }
    
    return (<EditDKT url={url}/>)
  }
  
  return (
    <>
      {editDanhMuc()}
    </>
  )
}

export default EditDanhMuc
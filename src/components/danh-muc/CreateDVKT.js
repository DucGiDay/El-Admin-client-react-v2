import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard'
import axios from 'axios';
import { Button, Input, notification  } from 'antd';
import DropdownDanhMucv2 from './DropdownDanhMuc-v2';

function CreateDVKT() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [listDangKienThuc, setListDangKienThuc] = useState([])
  const [idDangKienThuc, setIdDangKienThuc] = useState('')
  useEffect(() => {
    getDKT()
  }, [])
  async function getDKT() {
    await axios
      .get(`http://localhost:4000/api/dkt`)
      .then((response) => setListDangKienThuc(response.data))
      .catch(error => console.log(error))
  }
  const listDangKienThucObject = listDangKienThuc.map((response) => {
    const dangKienThuc = JSON.parse(response)
    return dangKienThuc
  })
  const createDVKT = () => {
    if (!idDangKienThuc.length) {
      const noti = {
        type: 'error',
        message: 'Lựa chọn dạng kiến thức là bắt buộc',
        description: 'Vui lòng chọn dạng kiến thức'
      }
      return openNotificationWithIcon(noti)
    }
    if (!name.length) {
      const noti = {
        type: 'error',
        message: 'Tên đơn vị kiến thức là bắt buộc',
        description: 'Vui lòng nhập Tên đơn vị kiến thức'
      }
      return openNotificationWithIcon(noti)
    }
    const DVKT = {
      Id_Category_DKT: idDangKienThuc,
      Name: name,
      Slug: slug
    }
    const noti = {
      type: 'success',
      message: 'Tạo thành công',
    }
    axios.post(`http://localhost:4000/api/dvkt/`, DVKT)
      .then((res) => {
        openNotificationWithIcon(noti)
      })
      .catch(err => openNotificationWithIcon({ type: 'error', title: err}))
  };
  const handleChangeName = (event) => {
    setName(event.target.value)
  }
  const handleChangeSlug = (event) => {
    setSlug(event.target.value)
  }
  const openNotificationWithIcon = ({type, message, description}) => {
    notification[type]({ 
      message,
      description,
      className: 'custom-class',
      style: {
        marginTop: '3.5rem',
      },
    });
  };
  
  const getIdDangKienThucFromDropDown = (id) => {
    setIdDangKienThuc(id)
  }

  
  return (
    <MainCard title="Tạo đơn vị kiến thức">
      <DropdownDanhMucv2 listDanhMuc={listDangKienThucObject} title={"Dạng kiến thức"} getIdDanhMuc={getIdDangKienThucFromDropDown}/>
      <br />
      <br />
      <label htmlFor="">Name <span style={{color: 'red'}}>*</span></label>
      <Input placeholder="*Nhập tên dạng kiến thức" value={name} onChange={handleChangeName} required/>
      <br />
      <br />
      <label htmlFor="" >Slug</label>
      <Input placeholder="Nhập Slug" value={slug} onChange={handleChangeSlug} />
      <br />
      <br />
      <Button type="primary" onClick={createDVKT}>Tạo</Button>
    </MainCard>
  )
}

export default CreateDVKT
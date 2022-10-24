import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard'
import axios from 'axios';
import { Button, Input, notification } from 'antd';
import { Grid } from '@mui/material';
import DropdownDanhMucv2 from './DropdownDanhMuc-v2';

function CreateMTCT() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [listDangKienThuc, setListDangKienThuc] = useState([])
  const [listDonViKienThuc, setListDonViKienThuc] = useState([])
  const [idDangKienThuc, setIdDangKienThuc] = useState('')
  const [idDonViKienThuc, setIdDonViKienThuc] = useState('')
  useEffect(() => {
    getDKT()
    getDVKT() 
  }, [])
  async function getDKT() {
    await axios
      .get(`http://localhost:4000/api/dkt`)
      .then((response) => setListDangKienThuc(response.data))
      .catch(error => console.log(error))
  }
  async function getDVKT() {
    await axios
      .get(`http://localhost:4000/api/dVkt`)
      .then((response) => setListDonViKienThuc(response.data))
      .catch(error => console.log(error))
  }
  const listDangKienThucObject = listDangKienThuc.map((response) => {
    const dangKienThuc = JSON.parse(response)
    return dangKienThuc
  })
  const listDonViKienThucObject = listDonViKienThuc.map((response) => {
    const donViKienThuc = JSON.parse(response)
    return donViKienThuc
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
    if (!idDonViKienThuc.length) {
      const noti = {
        type: 'error',
        message: 'Lựa chọn đơn vị kiến thức là bắt buộc',
        description: 'Vui lòng chọn đơn vị kiến thức'
      }
      return openNotificationWithIcon(noti)
    }
    if (!name.length) {
      const noti = {
        type: 'error',
        message: 'Tên mô tả chi tiết là bắt buộc',
        description: 'Vui lòng nhập tên mô tả chi tiết'
      }
      return openNotificationWithIcon(noti)
    }
    const MTCT = {
      Id_Category_DKT: idDangKienThuc,
      Id_Category_DVKT: idDonViKienThuc,
      Name: name,
      Slug: slug
    }
    const noti = {
      type: 'success',
      message: 'Tạo thành công',
    }
    axios.post(`http://localhost:4000/api/chi-tiet`, MTCT)
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
  const getIdDonViKienThucFromDropDown = (id) => {
    setIdDonViKienThuc(id)
  }

  const dropDown = () => {
    const listDonViKienThucByIdDKT = listDonViKienThucObject.filter(item => item.Id_category_dkt === idDangKienThuc)
    return (<Grid container spacing={2}>
      <Grid item xs={6}>
        <DropdownDanhMucv2 listDanhMuc={listDangKienThucObject} title={"Dạng kiến thức"} getIdDanhMuc={getIdDangKienThucFromDropDown} />
      </Grid>
      <Grid item xs={6}>
        <DropdownDanhMucv2 listDanhMuc={listDonViKienThucByIdDKT} title={"Đơn vị kiến thức"} getIdDanhMuc={getIdDonViKienThucFromDropDown}/>
      </Grid>
    </Grid>)
  }
  return (
    <MainCard title="Tạo mô tả chi tiết">
      {dropDown()}
      <br />
      <label htmlFor="">Name <span style={{color: 'red'}}>*</span></label>
      <Input placeholder="*Nhập tên mô tả chi tiết" value={name} onChange={handleChangeName} required/>
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

export default CreateMTCT
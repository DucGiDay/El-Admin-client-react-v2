import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard'
import axios from 'axios';
import { Button, Input, notification } from 'antd';
import DropdownDanhMucV2 from './DropdownDanhMuc-v2';
import { Grid } from '../../../node_modules/@mui/material/index';
function EditMTCT({url}) {
  const [MTCT, setMTCT] = useState({})
  const [listDangKienThuc, setListDangKienThuc] = useState([])
  const [listDonViKienThuc, setListDonViKienThuc] = useState([])
  const [idDangKienThuc, setIdDangKienThuc] = useState('')
  const [idDonViKienThuc, setIdDonViKienThuc] = useState('')
  useEffect(() => {
    listDKT()
    listDVKT()
    getMTCT()
  }, []);

  async function listDKT() {
    await axios
      .get(`http://localhost:4000/api/dkt`)
      .then((response) => setListDangKienThuc(response.data))
      .catch(error => console.log(error))
  }
  async function listDVKT() {
    await axios
      .get(`http://localhost:4000/api/dvkt`)
      .then((response) => setListDonViKienThuc(response.data))
      .catch(error => console.log(error))
  }
  async function getMTCT() {
    await axios
      .get(url)
      .then((response) => {
        setMTCT(response.data)
        setIdDonViKienThuc(response.data.Id_category_dvkt)
      })
      .catch(error => console.log(error))
  }
  let defaultDKT = ""
  let defaultDVKT = ""
  const listDangKienThucObject = listDangKienThuc.map((response) => {
    const dangKienThuc = JSON.parse(response)
    return dangKienThuc
  })
  const listDonViKienThucObject = listDonViKienThuc.map((response) => {
    const donViKienThuc = JSON.parse(response)
    if (donViKienThuc.id === idDonViKienThuc) {
      defaultDVKT = donViKienThuc.id
      defaultDKT = donViKienThuc.Id_category_dkt
    }
    return donViKienThuc
  })

  const handleChangeName = (event) => {
    setMTCT({
      Name: event.target.value,
      Slug: MTCT.Slug,
      Id_category_dvkt: MTCT.Id_category_dvkt
    })
  }
  const handleChangeSlug = (event) => {
    setMTCT({
      Name: MTCT.Name,
      Slug: event.target.value,
      Id_category_dvkt: MTCT.Id_category_dvkt
    })
  }

  const updateMTCT = () => {
    if (!idDangKienThuc.length && !defaultDKT.length) {
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
    if (!MTCT.Name.length) {
      const noti = {
        type: 'error',
        message: 'Tên dạng kiến thức là bắt buộc',
        description: 'Vui lòng nhập Tên dạng kiến thức'
      }
      return openNotificationWithIcon(noti)
    }

    setMTCT({
      Name: MTCT.Name,
      Slug: MTCT.Slug,
      Id_category_dvkt: idDonViKienThuc
    })

    const noti = {
      type: 'success',
      message: 'Lưu thành công',
    }
    axios.put(url, MTCT)
      .then((res) => {
        openNotificationWithIcon(noti)
      })
  }

  const getIdDangKienThucFromDropDown = (id) => {
    setIdDangKienThuc(id)
  }
  const getIdDonViKienThucFromDropDown = (id) => {
    setIdDonViKienThuc(id)
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

  const dropDown = () => {
    const listDonViKienThucByIdDKT = listDonViKienThucObject.filter(item => item.Id_category_dkt === idDangKienThuc)
    return (<Grid container spacing={2}>
      <Grid item xs={6}>
        <DropdownDanhMucV2 listDanhMuc={listDangKienThucObject} title={"Dạng kiến thức"} getIdDanhMuc={getIdDangKienThucFromDropDown} defaultDanhMuc={defaultDKT} />
      </Grid>
      <Grid item xs={6}>
        <DropdownDanhMucV2 listDanhMuc={listDonViKienThucByIdDKT} title={"Đơn vị kiến thức"} getIdDanhMuc={getIdDonViKienThucFromDropDown} defaultDanhMuc={defaultDVKT} />
      </Grid>
    </Grid>)
  }
  return (
    <MainCard title="Sửa mô tả chi tiết">
      {dropDown()}
      <br />
      <label htmlFor="">Name <span style={{color: 'red'}}>*</span></label>
      <Input placeholder="*Nhập tên mô tả chi tiết" value={MTCT.Name} onChange={handleChangeName} required/>
      <br />
      <br />
      <label htmlFor="" >Slug</label>
      <Input placeholder="Nhập Slug" value={MTCT.Slug} onChange={handleChangeSlug} />
      <br />
      <br />
      <Button type="primary" onClick={updateMTCT}>Lưu</Button>
    </MainCard>
  )
}

export default EditMTCT
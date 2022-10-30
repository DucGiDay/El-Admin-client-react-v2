import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard'
import axios from 'axios';
import { Button, Input, notification } from 'antd';
import DropdownDanhMucV2 from './DropdownDanhMuc-v2';
function EditDVKT({url}) {
  const [DVKT, setDVKT] = useState({})
  const [listDangKienThuc, setListDangKienThuc] = useState([])
  const [idDangKienThuc, setIdDangKienThuc] = useState('')

  useEffect(() => {
    listDKT()
    getDVKT()
  }, []);

  async function listDKT() {
    await axios
      .get(`http://localhost:4000/api/dkt`)
      .then((response) => setListDangKienThuc(response.data))
      .catch(error => console.log(error))
  }
  async function getDVKT() {
    await axios
      .get(url)
      .then((response) => {
        setDVKT(response.data)
        setIdDangKienThuc(response.data.Id_category_dkt)
      })
      .catch(error => console.log(error))
  }
  let defaultDKT = {}
  const listDangKienThucObject = listDangKienThuc.map((response) => {
    const dangKienThuc = JSON.parse(response)
    if (dangKienThuc.id === idDangKienThuc) {
      defaultDKT = dangKienThuc
    }
    return dangKienThuc
  })

  const handleChangeName = (event) => {
    setDVKT({
      Name: event.target.value,
      Slug: DVKT.Slug,
      Id_category_dkt: DVKT.Id_category_dkt
    })
  }
  const handleChangeSlug = (event) => {
    setDVKT({
      Name: DVKT.Name,
      Slug: event.target.value,
      Id_category_dkt: DVKT.Id_category_dkt
    })
  }

  const updateDKT = () => {
    if (!idDangKienThuc.length) {
      const noti = {
        type: 'error',
        message: 'Lựa chọn dạng kiến thức là bắt buộc',
        description: 'Vui lòng chọn dạng kiến thức'
      }
      return openNotificationWithIcon(noti)
    }
    if (!DVKT.Name.length) {
      const noti = {
        type: 'error',
        message: 'Tên dạng kiến thức là bắt buộc',
        description: 'Vui lòng nhập Tên dạng kiến thức'
      }
      return openNotificationWithIcon(noti)
    }

    setDVKT({
      Name: DVKT.Name,
      Slug: DVKT.Slug,
      Id_category_dkt: idDangKienThuc
    })

    const noti = {
      type: 'success',
      message: 'Lưu thành công',
    }
    axios.put(url, DVKT)
      .then((res) => {
        openNotificationWithIcon(noti)
      })
  }

  const getIdDangKienThucFromDropDown = (id) => {
    setIdDangKienThuc(id)
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

  return (
    <MainCard title="Sửa đơn vị kiến thức">
      <DropdownDanhMucV2
        listDanhMuc={listDangKienThucObject}
        title={"Dạng kiến thức"}
        getIdDanhMuc={getIdDangKienThucFromDropDown}
        defaultDanhMuc={defaultDKT}
      />
      <br />
      <br />
      <label htmlFor="">Name <span style={{color: 'red'}}>*</span></label>
      <Input placeholder="*Nhập tên dạng kiến thức" value={DVKT.Name} onChange={handleChangeName} required/>
      <br />
      <br />
      <label htmlFor="" >Slug</label>
      <Input placeholder="Nhập Slug" value={DVKT.Slug} onChange={handleChangeSlug} />
      <br />
      <br />
      <Button type="primary" onClick={updateDKT}>Lưu</Button>
    </MainCard>
  )
}

export default EditDVKT
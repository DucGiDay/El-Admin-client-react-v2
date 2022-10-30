import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard'
import axios from 'axios';
import { Button, Input, notification } from 'antd';

function EditDKT({ url }) {
  const [DKT, setDKT] = useState({})

  useEffect(() => {
    getDKT()
  }, []);
  async function getDKT() {
    await axios
      .get(url)
      .then((response) => {
        setDKT(response.data)
      })
      .catch(error => console.log(error))
  }

  const handleChangeName = (event) => {
    setDKT({
      Name: event.target.value,
      Slug: DKT.Slug
    })
  }
  const handleChangeSlug = (event) => {
    setDKT({
      Name: DKT.Name,
      Slug: event.target.value
    })
  }

  const updateDKT = () => {
    if (!DKT.Name.length) {
      const noti = {
        type: 'error',
        message: 'Tên dạng kiến thức là bắt buộc',
        description: 'Vui lòng nhập Tên dạng kiến thức'
      }
      return openNotificationWithIcon(noti)
    }
    const noti = {
      type: 'success',
      message: 'Lưu thành công',
    }
    axios.put(url, DKT)
      .then((res) => {
        openNotificationWithIcon(noti)
      })
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
    <MainCard title="Sửa dạng kiến thức">

      <label htmlFor="">Name <span style={{color: 'red'}}>*</span></label>
      <Input placeholder="*Nhập tên dạng kiến thức" onChange={handleChangeName} required value={DKT.Name} />
      <br />
      <br />
      <label htmlFor="" >Slug</label>
      <Input placeholder="Nhập Slug" onChange={handleChangeSlug} value={ DKT.Slug } />
      <br />
      <br />
      <Button type="primary" onClick={updateDKT}>Lưu</Button>

    </MainCard>
  )
}

export default EditDKT
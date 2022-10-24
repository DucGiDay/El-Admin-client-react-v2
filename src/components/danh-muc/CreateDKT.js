import React, { useState } from 'react';
import MainCard from 'components/MainCard'
import axios from 'axios';
import { Button, Input, notification } from 'antd';

function CreateDKT() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const createDKT = () => {
    if (!name.length) {
      const noti = {
        type: 'error',
        message: 'Tên dạng kiến thức là bắt buộc',
        description: 'Vui lòng nhập Tên dạng kiến thức'
      }
      return openNotificationWithIcon(noti)
    }
    const DKT = {
      Name: name,
      Slug: slug
    }
    const noti = {
      type: 'success',
      message: 'Tạo thành công',
    }
    axios.post(`http://localhost:4000/api/dkt/`, DKT)
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
  return (
    <MainCard title="Tạo dạng kiến thức">

      <label htmlFor="">Name <span style={{color: 'red'}}>*</span></label>
      <Input placeholder="*Nhập tên dạng kiến thức" onChange={handleChangeName} required/>
      <br />
      <br />
      <label htmlFor="" >Slug</label>
      <Input placeholder="Nhập Slug" onChange={handleChangeSlug} />
      <br />
      <br />
      <Button type="primary" onClick={createDKT}>Tạo</Button>

    </MainCard>
  )
}

export default CreateDKT
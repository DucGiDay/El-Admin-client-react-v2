import DropdownDanhMucV2 from 'components/danh-muc/DropdownDanhMuc-v2'
import CauHoiConDialog from 'components/cau-hoi/CauHoiConModal'
import MainCard from 'components/MainCard'
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Button, Input, Form, Space, notification } from 'antd';
import { Grid }from '@mui/material'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function CreateCauHoiKep() {
  const [listDangKienThuc, setListDangKienThuc] = useState([])
  const [listDonViKienThuc, setListDonViKienThuc] = useState([])
  const [listMoTaChiTiet, setListMoTaChiTiet] = useState([])
  const [idDangKienThuc, setIdDangKienThuc] = useState('')
  const [idDonViKienThuc, setIdDonViKienThuc] = useState('')
  const [idMoTaChiTiet, setIdMoTaChiTiet] = useState('')
  const [questionMain, setQuestionMain] = useState('')
  const [requirement, setRequirement] = useState('')
  const [subQues, setSubQues] = useState({})
  const [level, setLevel] = useState('')
  useEffect(() => {
    getDKT()
    getDVKT() 
    getMTCT()
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
  async function getMTCT() {
    await axios
      .get(`http://localhost:4000/api/chi-tiet`)
      .then((response) => setListMoTaChiTiet(response.data))
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
  const listMoTaChiTietObject = listMoTaChiTiet.map((response) => {
    const moTaChiTiet = JSON.parse(response)
    return moTaChiTiet
  })
  const getIdDangKienThucFromDropDown = (id) => {
    setIdDangKienThuc(id)
    setIdDonViKienThuc('')
    setIdMoTaChiTiet('')
  }
  const getIdDonViKienThucFromDropDown = (id) => {
    setIdDonViKienThuc(id)
    setIdMoTaChiTiet('')
  }
  const getIdMoTaChiTietFromDropDown = (id) => {
    setIdMoTaChiTiet(id)
  }
  const getLevel = (level) => {
    setLevel(level)
  }

  const getCauHoiFromModal = (ques) => {
    setSubQues(Object.assign(subQues, ques))
  }

  const handleQuestionMain = (event) => {
    setQuestionMain(event.target.value)
  }
  const handleRequirement = (event) => {
    setRequirement(event.target.value)
  }
  
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  const create = () => {
    const cauHoiKep = {
      Question_Main: questionMain,
      Level_Main: level,
      Id_cate_dkt: idDangKienThuc,
      Id_cate_dvkt: idDonViKienThuc,
      Id_cate_mtct: idMoTaChiTiet,
      Question_Requirement: requirement,
      Sub_Question: subQues
    }
    const noti = {
      type: 'success',
      message: 'Tạo thành công',
    }
    axios.post(`http://localhost:4000/api/cau-hoi-kep`, cauHoiKep)
      .then((res) => {
        openNotificationWithIcon(noti)
      })
      .catch(err => openNotificationWithIcon({ type: 'error', title: err}))
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

  const DropDown = () => {
    const listDonViKienThucByIdDKT = listDonViKienThucObject.filter(item => item.Id_category_dkt === idDangKienThuc)
    const listMTCTByIdDVKT = listMoTaChiTietObject.filter(item => item.Id_category_dvkt === idDonViKienThuc)
    const levels = [
      {
        id: '1',
        Name: '1'
      },
      {
        id: '2',
        Name: '2'
      },
      {
        id: '3',
        Name: '3'
      },
      {
        id: '4',
        Name: '4'
      },
      {
        id: '5',
        Name: '5'
      },
    ]
    return (<Grid container spacing={2}>
      <Grid item xs={3}>
        <DropdownDanhMucV2 listDanhMuc={listDangKienThucObject} title={"Dạng kiến thức"} getIdDanhMuc={getIdDangKienThucFromDropDown} />
      </Grid>
      <Grid item xs={3}>
        <DropdownDanhMucV2 listDanhMuc={listDonViKienThucByIdDKT} title={"Đơn vị kiến thức"} getIdDanhMuc={getIdDonViKienThucFromDropDown}/>
      </Grid>
      <Grid item xs={3}>
        <DropdownDanhMucV2 listDanhMuc={listMTCTByIdDVKT} title={"Mô tả chỉ tiết"} getIdDanhMuc={getIdMoTaChiTietFromDropDown}/>
      </Grid>
      <Grid item xs={3}>
        <DropdownDanhMucV2 listDanhMuc={levels} title={"Level"} getIdDanhMuc={getLevel}/>
      </Grid>
    </Grid>)
  }
  return (
    <MainCard title="Thêm câu hỏi kép">
      {DropDown()}
      <br />
      <br />
      <label htmlFor="">Câu hỏi chính <span style={{color: 'red'}}>*</span></label>
      <Input placeholder="*Nhập câu hỏi chính" onChange={handleQuestionMain} required/>
      <br />
      <br />
      <label htmlFor="" >Yêu cầu câu hỏi</label>
      <Input onChange={handleRequirement}/>
      <br />
      <br />
      <MainCard title="Câu hỏi nhỏ">
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'last']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing last name',
                        },
                      ]}
                    >
                      <CauHoiConDialog number={index +1} getCauHoi={getCauHoiFromModal}/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm câu hỏi nhỏ
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </MainCard>
      <Button type="primary" onClick={create}>
        Tạo
      </Button>
    </MainCard>
  )
}

export default CreateCauHoiKep
import DropdownDanhMucV2 from 'components/danh-muc/DropdownDanhMuc-v2'
import MainCard from 'components/MainCard'
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Button, Input, Radio, notification } from 'antd';
import { Grid }from '@mui/material'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

function CreateCauHoi() {
  const [listDangKienThuc, setListDangKienThuc] = useState([])
  const [listDonViKienThuc, setListDonViKienThuc] = useState([])
  const [listMoTaChiTiet, setListMoTaChiTiet] = useState([])
  const [idDangKienThuc, setIdDangKienThuc] = useState('')
  const [idDonViKienThuc, setIdDonViKienThuc] = useState('')
  const [idMoTaChiTiet, setIdMoTaChiTiet] = useState('')
  const [question, setQuestion] = useState('undefined')
  const [slug, setSlug] = useState('')
  const [requirement, setRequirement] = useState('')
  const [valueRadio, setValueRadio] = useState(1);
  const [level, setLevel] = useState('')
  const [ans1, setAns1] = useState('undefined')
  const [ans2, setAns2] = useState('undefined')
  const [ans3, setAns3] = useState('undefined')
  const [ans4, setAns4] = useState('undefined')
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
  const handleSlug = (event) => {
    setSlug(event.target.value)
  }
  const onChangeRadio = (e) => {
    setValueRadio(e.target.value)
  }
  

  const create = () => {
    const option_ans = [ans1, ans2, ans3, ans4]
    const cauHoi = {
      Content_Question: question,
      Level: level,
      Id_cate_dkt: idDangKienThuc,
      Id_cate_dvkt: idDonViKienThuc,
      Id_cate_mtct: idMoTaChiTiet,
      slug: slug,
      Requirement: requirement,
      option_ans,
      True_ans: option_ans[valueRadio-1]
    }
    const noti = {
      type: 'success',
      message: 'Tạo thành công',
    }
    axios.post(`http://localhost:4000/api/cau-hoi`, cauHoi)
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
    <MainCard title="Thêm câu hỏi">
      {DropDown()}
      <br />
      <br />
      <label htmlFor="">Câu hỏi<span style={{color: 'red'}}>*</span></label>
      {/* <Input placeholder="*Nhập nội dung câu hỏi" onChange={handleQuestion} required/> */}
      <div>
        <ReactQuill
          theme='snow'
          value={question}
          onChange={setQuestion}
          style={{minHeight: '100px'}}
        />
      </div>
      <br />
      <br />

      <MainCard title="Answer">
        <Radio.Group onChange={onChangeRadio} value={valueRadio} style={{columnCount: '2'}}>
          <Radio value={1}>
            <label htmlFor="" >Câu trả lời 1</label>
            {/* <Input onChange={handleAns1}/> */}
            <ReactQuill
              theme='snow'
              value={ans1}
              onChange={setAns1}
              style={{minHeight: '100px'}}
            />
          </Radio>
          <Radio value={2}>
            <label htmlFor="" >Câu trả lời 2</label>
            {/* <Input onChange={handleAns2}/> */}
            <ReactQuill
              theme='snow'
              value={ans2}
              onChange={setAns2}
              style={{minHeight: '100px'}}
            />
          </Radio>
          <Radio value={3}>
            <label htmlFor="" >Câu trả lời 3</label>
            {/* <Input onChange={handleAns3}/> */}
            <ReactQuill
              theme='snow'
              value={ans3}
              onChange={setAns3}
              style={{minHeight: '100px'}}
            />
          </Radio>
          <Radio value={4}>
            <label htmlFor="" >Câu trả lời 4</label>
            {/* <Input onChange={handleAns4}/> */}
            <ReactQuill
              theme='snow'
              value={ans4}
              onChange={setAns4}
              style={{minHeight: '100px'}}
            />
          </Radio>
        </Radio.Group>
      </MainCard>

      <label htmlFor="" >Slug</label>
      <Input onChange={handleSlug}/>
      <br />
      <br />
      
      <Button type="primary" onClick={create}>
        Tạo
      </Button>
    </MainCard>
  )
}

export default CreateCauHoi
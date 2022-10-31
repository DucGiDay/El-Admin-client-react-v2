import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard'
import axios from 'axios';
import { Button, Input, notification } from 'antd';
import { Grid } from '@mui/material';
import CauHoiDropdownv2 from './CauHoiDropdown-v2';

function CreateCHD() {
    const [listDangKienThuc, setListDangKienThuc] = useState([])
    const [listDonViKienThuc, setListDonViKienThuc] = useState([])
    const [listMoTaChiTiet, setListMoTaChiTiet] = useState([])
    const [idMoTaChiTiet, setIdMoTaChiTiet] = useState('')
    const [idDangKienThuc, setIdDangKienThuc] = useState('')
    const [idDonViKienThuc, setIdDonViKienThuc] = useState('')
    const [content_Question, setContent_Question] = useState('')
    const [ans_1, setAns_1] = useState('')
    const [ans_2, setAns_2] = useState('')
    const [ans_3, setAns_3] = useState('')
    const [ans_4, setAns_4] = useState('')
    const [true_ans, setTrue_ans] = useState('')
    const [level, setlevel] = useState('')
    const [slug, setSlug] = useState('')
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
    const listMoTaChiTietObject = listMoTaChiTiet.map((response) =>{
        const moTaChiTiet = response.split(response)
        return moTaChiTiet
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
        if (!idMoTaChiTiet.length) {
            const noti = {
                type: 'error',
                message: 'Lựa chọn mô tả chi tiết là bắt buộc',
                description: 'Vui lòng chọn mô tả chi tiết'
            }
            return openNotificationWithIcon(noti)
            }
        if (!content_Question.length) {
        const noti = {
            type: 'error',
            message: 'Câu hỏi là bắt buộc',
            description: 'Vui lòng nhập câu hỏi'
        }
        return openNotificationWithIcon(noti)
        }
        if (!ans_1.length || !ans_2.length || !ans_3.length || !ans_4.length) {
            const noti = {
                type: 'error',
                message: 'Các câu trả lời là bắt buộc',
                description: 'Vui lòng nhập đủ tất cả câu trả lời'
            }
            return openNotificationWithIcon(noti)
        }
        if (!true_ans.length) {
            const noti = {
                type: 'error',
                message: 'Câu trả lời đúng là bắt buộc',
                description: 'Vui lòng nhập câu trả lời đúng'
            }
            return openNotificationWithIcon(noti)
        }
        const CHD = {
            Don_Kep: 0,
            Level: level,
            Content_Question: content_Question,
            Option_ans: [
                ans_1,
                ans_2,
                ans_3,
                ans_4,
            ],
            True_ans: true_ans,
            Id_cate_dvkt: idDonViKienThuc,
            Id_cate_dkt: idDangKienThuc,
            Id_cate_mtct: idMoTaChiTiet,
            Slug: slug
        }
        const noti = {
        type: 'success',
        message: 'Tạo thành công',
        }
        axios.post(`http://localhost:4000/api/cau-hoi`, CHD)
        .then((res) => {
            openNotificationWithIcon(noti)
        })
        .catch(err => openNotificationWithIcon({ type: 'error', title: err}))
    };
    const handleChangeContent_Question = (event) => {
        setContent_Question(event.target.value);
    }
    const handleChangeAns_1 = (event) => {
        setAns_1(event.target.value);
    }
    const handleChangeAns_2 = (event) => {
        setAns_2(event.target.value);
    }
    const handleChangeAns_3 = (event) => {
        setAns_3(event.target.value);
    }
    const handleChangeAns_4 = (event) => {
        setAns_4(event.target.value);
    }
    const handleChangeTrue_ans = (event) => {
        setTrue_ans(event.target.value);
    }
    const handleChangeLevel = (event) => {
        setlevel(event.target.value);
    }
    const handleChangeSlug = (event) => {
        setSlug(event.target.value);
    }
    const getIdDangKienThucFromDropDown = (idDangKienThuc) => {
        setIdDangKienThuc(idDangKienThuc);
    }
    const getIdDonViKienThucFromDropDown = (idDonViKienThuc) => {
        setIdDonViKienThuc(idDonViKienThuc);
    }
    const getIdMoTaChiTietFromDropDown = (idMoTaChiTiet) => {
        setIdMoTaChiTiet(idMoTaChiTiet);
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
        const listMoTaChiTietByIdDVKT = listMoTaChiTietObject.filter(item => item.Id_category_dvkt === idDonViKienThuc)
        
        return (<Grid container spacing={3}>
        <Grid item xs={4}>
            <CauHoiDropdownv2 listDanhMuc={listDangKienThucObject} title={"Dạng kiến thức"} getIdDanhMuc={getIdDangKienThucFromDropDown} />
        </Grid>
        <Grid item xs={4}>
            <CauHoiDropdownv2 listDanhMuc={listDonViKienThucByIdDKT} title={"Đơn vị kiến thức"} getIdDanhMuc={getIdDonViKienThucFromDropDown}/>
        </Grid>
        <Grid item xs={4}>
            <CauHoiDropdownv2 listDanhMuc={listMoTaChiTietByIdDVKT} title={"Mô Tả Chi Tiết"} getIdDanhMuc={getIdMoTaChiTietFromDropDown}/>
        </Grid>
        </Grid>)
    }
    return (
        <MainCard title="Tạo mô tả chi tiết">
        {dropDown()}
        <br />
        <label htmlFor="">Câu hỏi <span style={{color: 'red'}}>*</span></label>
        <Input placeholder="*Nhập câu hỏi" value={content_Question} onChange={handleChangeContent_Question} required/>
        <br />
        <br />
        <label htmlFor="">Đáp án 1 <span style={{color: 'red'}}>*</span></label>
        <Input placeholder="*Nhập đáp án 1" value={ans_1} onChange={handleChangeAns_1} required/>
        <br />
        <br />
        <label htmlFor="">Đáp án 2 <span style={{color: 'red'}}>*</span></label>
        <Input placeholder="*Nhập đáp án 2" value={ans_2} onChange={handleChangeAns_2} required/>
        <br />
        <br />
        <label htmlFor="">Đáp án 3 <span style={{color: 'red'}}>*</span></label>
        <Input placeholder="*Nhập đáp án 3" value={ans_3} onChange={handleChangeAns_3} required/>
        <br />
        <br />
        <label htmlFor="">Đáp án 4 <span style={{color: 'red'}}>*</span></label>
        <Input placeholder="*Nhập đáp án 4" value={ans_4} onChange={handleChangeAns_4} required/>
        <br />
        <br />
        <label htmlFor="">Đáp án đúng <span style={{color: 'red'}}>*</span></label>
        <Input placeholder="*Nhập đáp án đúng" value={true_ans} onChange={handleChangeTrue_ans} required/>
        <br />
        <br />
        <label htmlFor="" >Slug</label>
        <Input placeholder="Nhập Slug" value={slug} onChange={handleChangeSlug} />
        <br />
        <br />
        <label htmlFor="" >Level</label>
        <Input placeholder="Nhập Level" value={level} onChange={handleChangeLevel} />
        <br />
        <br />
        <Button type="primary" onClick={createDVKT}>Tạo</Button>
        </MainCard>
    )
}

export default CreateCHD
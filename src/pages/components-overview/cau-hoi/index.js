import React, { useEffect, useState } from 'react'
import TableCauHoi from 'components/cau-hoi/TableCauHoi'
import axios from 'axios';
import MainCard from 'components/MainCard';
import LevelDropdown from 'components/cau-hoi/LevelDropdown';
import CauHoiDropdown from 'components/cau-hoi/CauHoiDropdown';
import Grid from '@mui/material/Grid';


const CauHoi = () => {
    const [listCauHoi, setListCauHoi] = useState([])
    const [listDangKienThuc, setListDangKienThuc] = useState([])
    const [listDonViKienThuc, setListDonViKienThuc] = useState([])
    const [listMoTaChiTiet, setListMoTaChiTiet] = useState([])
    const [idDangKienThuc, setIdDangKienThuc] = useState('')
    const [idDonViKienThuc, setIdDonViKienThuc] = useState('')
    const [idMoTaChiTiet, setIdMoTaChiTiet] = useState('')
    const [level, setlevel] = useState('')

    async function getAllDKT() {
        await axios
        .get(`http://localhost:4000/api/dkt`)
        .then((response) => {
            setListDangKienThuc(response.data)
        })
        .catch(error => console.log(error))
    }
    async function getAllDVKT() {
        await axios
        .get(`http://localhost:4000/api/dvkt`)
        .then((response) => setListDonViKienThuc(response.data))
        .catch(error => console.log(error))
    }
    async function getAllMTCT() {
        await axios
        .get(`http://localhost:4000/api/chi-tiet`)
        .then((response) => setListMoTaChiTiet(response.data))
        .catch(error => console.log(error))
    }
    async function getAllCH() {
        await axios
        .get(`http://localhost:4000/api/both-cau-hoi`)
        .then((response) => setListCauHoi(response.data))
        .catch(error => console.log(error))
    }
    
    useEffect(() => {
        getAllDKT()
        getAllDVKT()
        getAllMTCT()
        getAllCH()
    }, []);
    const listCauHoiObject = listCauHoi.map((response) => {
        const cauHoi = JSON.parse(response)
        return cauHoi
    })
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
    

    const getIdDangKienThucFromDropDown = (idDangKienThuc) => {
        setIdDangKienThuc(idDangKienThuc);
    }
    const getIdDonViKienThucFromDropDown = (idDonViKienThuc) => {
        setIdDonViKienThuc(idDonViKienThuc);
    }
    const getIdMoTaChiTietFromDropDown = (idMoTaChiTiet) => {
        setIdMoTaChiTiet(idMoTaChiTiet);
    }
    const getlevelFromDropDown = (level) => {
        setlevel(level);
    }
    // const getIdDonViKienThucFromDropDown = (idDonViKienThuc) => {
    //     setIdDonViKienThuc(idDonViKienThuc);
    // }
    const checkLevel = (listCauHoi) => {
        if (level.length && listCauHoi.length) {
            const _listCauHoi = listCauHoi.filter((cauHoi) => {
                return cauHoi.Level === level
            })
            return _listCauHoi
        }
        return []
    }
    const tableCauHoi = () => {
        if (!idDangKienThuc) {
            return (level.length ? <TableCauHoi props ={checkLevel(listCauHoiObject)} /> : <TableCauHoi props ={listCauHoiObject} />)
        }
        else if (idDangKienThuc && !idDonViKienThuc) {
            const listCauHoiByDKT = listCauHoiObject.filter(item => item.Id_cate_dkt === idDangKienThuc)
            return(level.length ? <TableCauHoi props ={checkLevel(listCauHoiByDKT)} /> : <TableCauHoi props ={listCauHoiByDKT} />)
        }
        else if (idDonViKienThuc && !idMoTaChiTiet) {
            const listCauHoiByDVKT = listCauHoiObject.filter(item => item.Id_cate_dvkt === idDonViKienThuc)
            return(level.length ? <TableCauHoi props ={checkLevel(listCauHoiByDVKT)} /> : <TableCauHoi props ={listCauHoiByDVKT} />)
        }
        else if (idMoTaChiTiet) {
            const listCauHoiByIdMTCT = listCauHoiObject.filter(item => item.Id_cate_mtct === idMoTaChiTiet)
            return(level.length ? <TableCauHoi props ={checkLevel(listCauHoiByIdMTCT)} /> : <TableCauHoi props ={listCauHoiByIdMTCT} />)
        }
        // const listCauHoiByIdMTCT = listCauHoiObject.filter(item => item.Id_cate_mtct === idMoTaChiTiet)
        // return(<TableCauHoi props ={listCauHoiByIdMTCT} />)
    }

    const dropDown = () => {
        const listDonViKienThucByIdDKT = listDonViKienThucObject.filter(item => item.Id_category_dkt === idDangKienThuc)
        const listMoTaChiTietByIdDVKT = listMoTaChiTietObject.filter(item => item.Id_category_dvkt === idDonViKienThuc)
        console.log("listMoTaChiTietObject",listMoTaChiTietObject)
        console.log("listMoTaChiTietByIdDVKT",listMoTaChiTietByIdDVKT)

        const levels = ['1', '2', '3']
        return (<Grid container spacing={3}>
            <Grid item xs={3}>
                <CauHoiDropdown props={listDangKienThucObject} danhMuc = {"Dạng Kiến Thức"} propsFunc={getIdDangKienThucFromDropDown} />
            </Grid>
            <Grid item xs={3}>
                <CauHoiDropdown props={listDonViKienThucByIdDKT} danhMuc = {"Đơn Vị Kiến Thức"} propsFunc={getIdDonViKienThucFromDropDown} />
            </Grid>
            <Grid item xs={3}>
                <CauHoiDropdown props={listMoTaChiTietByIdDVKT} danhMuc = {"Mô Tả Chi Tiết"} propsFunc={getIdMoTaChiTietFromDropDown} />
            </Grid>
            <Grid item xs={3}>
                <LevelDropdown levels={levels} option = {"Level"} propsFunc={getlevelFromDropDown} />
            </Grid>
        </Grid>)
    }

    return (
        <MainCard>
        {dropDown()}
        {tableCauHoi()}
        </MainCard>
    )
}

export default CauHoi
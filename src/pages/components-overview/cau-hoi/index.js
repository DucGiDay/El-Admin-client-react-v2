import React, { useEffect, useState } from 'react'
import TableCauHoi from 'components/cau-hoi/TableCauHoi'
import axios from 'axios';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import DropdownDanhMucV2 from 'components/danh-muc/DropdownDanhMuc-v2';


const CauHoi = () => {
    const [listCauHoi, setListCauHoi] = useState([])
    const [listDangKienThuc, setListDangKienThuc] = useState([])
    const [listDonViKienThuc, setListDonViKienThuc] = useState([])
    const [listMoTaChiTiet, setListMoTaChiTiet] = useState([])
    const [idDangKienThuc, setIdDangKienThuc] = useState('')
    const [idDonViKienThuc, setIdDonViKienThuc] = useState('')
    const [idMoTaChiTiet, setIdMoTaChiTiet] = useState('')
    const [level, setlevel] = useState('')

    useEffect(() => {
        axios
        .get(`http://localhost:4000/api/dkt`)
        .then((response) => setListDangKienThuc(response.data))
        .catch(error => console.log(error))
        
        axios
        .get(`http://localhost:4000/api/dvkt`)
        .then((response) => setListDonViKienThuc(response.data))
        .catch(error => console.log(error))
        axios
        .get(`http://localhost:4000/api/chi-tiet`)
        .then((response) => setListMoTaChiTiet(response.data))
        .catch(error => console.log(error))

        axios
        .get(`http://localhost:4000/api/both-cau-hoi`)
            .then((response) => setListCauHoi(response.data))
        .catch(error => console.log(error))
    }, []);
    const listCauHoiObject = listCauHoi.map((response) => {
        const cauHoi = JSON.parse(response)
        return cauHoi
    })
    const listDangKienThucObject = listDangKienThuc.map((response) => {
        const responseObject = response.split(' - id: ')
        const dangKienThuc = JSON.parse(responseObject[0])
        dangKienThuc.id = responseObject[1]
        return dangKienThuc
    })
    const listDonViKienThucObject = listDonViKienThuc.map((response) => {
        const responseObject = response.split(' - id: ')
        const donViKienThuc = JSON.parse(responseObject[0])
        donViKienThuc.id = responseObject[1]
        return donViKienThuc
    })
    const listMoTaChiTietObject = listMoTaChiTiet.map((response) => {
        const responseObject = response.split(' - id: ')
        const moTaChiTiet = JSON.parse(responseObject[0])
        moTaChiTiet.id = responseObject[1]
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
            <DropdownDanhMucV2 listDanhMuc={levels} title={"Level"} getIdDanhMuc={getlevelFromDropDown}/>
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
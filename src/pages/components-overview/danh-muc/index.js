import React, { useEffect, useState } from 'react'
import axios from 'axios';
// material-ui
import { Grid } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import TableDanhMuc from 'components/danh-muc/TableDanhMuc';
import DropdownDanhMuc from 'components/danh-muc/DropdownDanhMuc';

function DanhMuc() {
  const [listDangKienThuc, setListDangKienThuc] = useState([])
  const [listDonViKienThuc, setListDonViKienThuc] = useState([])
  const [listMoTaChiTiet, setListMoTaChiTiet] = useState([])
  const [idDangKienThuc, setIdDangKienThuc] = useState('')
  const [idDonViKienThuc, setIdDonViKienThuc] = useState('')

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

  useEffect(() => {
    getAllDKT()
    getAllDVKT()
    getAllMTCT()
  }, []);
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
    setIdDonViKienThuc('')
  }
  const getIdDonViKienThucFromDropDown = (idDonViKienThuc) => {
    setIdDonViKienThuc(idDonViKienThuc);
  }

  const tableDanhMuc = () => {
    if (!idDangKienThuc) {
      return (<TableDanhMuc props={listDangKienThucObject} danhMuc={ 'Dạng Kiến Thức' } />)
    }
    else if (idDangKienThuc && !idDonViKienThuc) {
      const listDonViKienThucByIdDKT = listDonViKienThucObject.filter(item => item.Id_category_dkt === idDangKienThuc)
      return(<TableDanhMuc props ={listDonViKienThucByIdDKT} danhMuc={ 'Đơn Vị Kiến Thức' }/>)

    }
    const listMoTaChiTietByIdDVKT = listMoTaChiTietObject.filter(item => item.Id_category_dvkt === idDonViKienThuc)
    return(<TableDanhMuc props ={listMoTaChiTietByIdDVKT} danhMuc={ 'Mô Tả Chi Tiết' }/>)
  }

  const dropDown = () => {
    const listDonViKienThucByIdDKT = listDonViKienThucObject.filter(item => item.Id_category_dkt === idDangKienThuc)
    return (<Grid container spacing={2}>
      <Grid item xs={6}>
        <DropdownDanhMuc props={listDangKienThucObject} danhMuc = {"Dạng Kiến Thức"} propsFunc={getIdDangKienThucFromDropDown} />
      </Grid>
      <Grid item xs={6}>
        <DropdownDanhMuc props={listDonViKienThucByIdDKT} danhMuc = {"Đơn Vị Kiến Thức"} propsFunc={getIdDonViKienThucFromDropDown} />
      </Grid>
    </Grid>)
  }

  return (
    <MainCard title="">
      {dropDown()}
      {tableDanhMuc()}
    </MainCard>
  )
}

export default DanhMuc;

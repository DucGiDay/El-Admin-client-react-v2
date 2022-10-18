import React, { useEffect, useState } from 'react'
import axios from 'axios';
// material-ui
import { Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import TableDanhMuc from 'components/danh-muc/TableDanhMuc';

function DanhMuc() {
  const [listDangKienThuc, setListDangKienThuc] = useState([])
  const [listDonViKienThuc, setListDonViKienThuc] = useState([])
  const [listMoTaChiTiet, setListMoTaChiTiet] = useState([])
  const [idDangKienThuc, setIdDangKienThuc] = useState('')
  const [idDonViKienThuc, setIdDonViKienThuc] = useState('')

  async function getAllDKT() {
    console.log(1)
    await axios
    .get(`http://localhost:4000/api/dkt`)
      .then((response) => {
        console.log(2)
        setListDangKienThuc(response.data)
      })
    .catch(error => console.log(error))
    console.log(3)
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

  const test = () => {
    console.log('listDangKienThucObject', listDangKienThucObject)
    console.log('listDonViKienThucObject', listDonViKienThucObject)
    console.log('listMoTaChiTietObject', listMoTaChiTietObject)
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

  return (
    <MainCard title="">
      {tableDanhMuc()}
    </MainCard>
  )
}

export default DanhMuc;

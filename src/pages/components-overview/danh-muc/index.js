import React, { useEffect, useState } from 'react'
import axios from 'axios';
// material-ui
import { Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

function DanhMuc() {
  const [listDangKienThuc, setListDangKienThuc] = useState([])
  const [listDonViKienThuc, setListDonViKienThuc] = useState([])
  const [listMoTaChiTiet, setListMoTaChiTiet] = useState([])
  const [idDangKienThuc, setIdDangKienThuc] = useState('')
  const [idDonViKienThuc, setIdDonViKienThuc] = useState('')

  async function queryDKT() {
    await axios
    .get(`http://localhost:4000/api/dkt`)
    .then((response) => setListDangKienThuc(response.data))
    .catch(error => console.log(error))
  }
  async function queryDVKT() {
    await axios
    .get(`http://localhost:4000/api/dvkt`)
    .then((response) => setListDonViKienThuc(response.data))
    .catch(error => console.log(error))
  }
  async function queryMTCT() {
    await axios
    .get(`http://localhost:4000/api/chi-tiet`)
    .then((response) => setListMoTaChiTiet(response.data))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    queryDKT()
    queryDVKT()
    queryMTCT()
  }, []);

  const test = async() => {
    await console.log('listDangKienThuc', listDangKienThuc)
  }

  return (
    <MainCard title="">
      <Button onClick={test}>helo</Button>
    </MainCard>
  )
}

export default DanhMuc;


import React from 'react'
import { Toolbar } from '../../../../node_modules/@mui/material/index'
import CreateDKT from '../../../components/danh-muc/CreateDKT'
import CreateDVKT from '../../../components/danh-muc/CreateDVKT'
import CreateMTCT from '../../../components/danh-muc/CreateMTCT'

function CreateDanhMuc() {
  return (
    <>
      <CreateDKT />
      <Toolbar/>
      <CreateDVKT />
      <Toolbar/>
      <CreateMTCT/>
    </>
  )
}

export default CreateDanhMuc
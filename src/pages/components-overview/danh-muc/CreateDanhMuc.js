
import React from 'react'
import CreateDKT from '../../../components/danh-muc/CreateDKT'
import CreateDVKT from '../../../components/danh-muc/CreateDVKT'
import CreateMTCT from '../../../components/danh-muc/CreateMTCT'

function CreateDanhMuc() {
  return (
    <>
      <CreateDKT />
      <CreateDVKT />
      <CreateMTCT/>
    </>
  )
}

export default CreateDanhMuc
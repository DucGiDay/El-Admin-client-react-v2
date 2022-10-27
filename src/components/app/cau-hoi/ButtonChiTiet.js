import React from 'react'
import CauHoiDialog from '../../cau-hoi/CauHoiDialog'
import CauHoiKepDialog from '../../cau-hoi/CauHoiKepDialog'


function ButtonChiTiet(props) {
    return (
        props.don_kep===0? <CauHoiDialog props={ props.props } />: <CauHoiKepDialog props={props.props}/>
    )
}

export default ButtonChiTiet
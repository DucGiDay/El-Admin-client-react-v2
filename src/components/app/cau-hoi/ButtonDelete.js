import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { NotificationManager} from 'react-notifications';


function ButtonDelete(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        deleteDanhMucById()
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const id = props.props
    let url = `http://localhost:4000/api/cau-hoi/${id}`
    const deleteDanhMucById = () => {
        axios
        .delete(url)
        .then(
            NotificationManager.success('Xóa thành công'),
            window.location.reload(false)
        )
    }
    return (
        <>
        <Button onClick={showModal} danger>Delete</Button>
        <Modal title="Confirm modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h2>{`Bạn có chắc chắn muốn xóa câu hoi ${id}`}</h2>
        </Modal>
        </>
    )
}

export default ButtonDelete
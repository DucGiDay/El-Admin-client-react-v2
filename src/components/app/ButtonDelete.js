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
  const danhMuc = props.danhMuc
  let url = `http://localhost:4000/api/dkt/${id}`
  if (danhMuc === 'Đơn Vị Kiến Thức') {
    url = `http://localhost:4000/api/dvkt/${id}`
  } else if (danhMuc === 'Mô Tả Chi Tiết') {
    url = `http://localhost:4000/api/chi-tiet/${id}`
  }
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
        <h2>{`Bạn có chắc chắn muốn xóa ${danhMuc} ${id}`}</h2>
      </Modal>
    </>
  )
}

export default ButtonDelete




// import { Button, Modal } from 'antd';
// import React, { useState } from 'react';
// const App = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Open Modal
//       </Button>
//       <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//       </Modal>
//     </>
//   );
// };
// export default App;
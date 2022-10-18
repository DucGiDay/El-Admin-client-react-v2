// assets
// import {
//     AppstoreAddOutlined,
//     AntDesignOutlined,
//     BarcodeOutlined,
//     BgColorsOutlined,
//     FontSizeOutlined,
//     LoadingOutlined
// } from '@ant-design/icons';

// icons
// const icons = {
//     FontSizeOutlined,
//     BgColorsOutlined,
//     BarcodeOutlined,
//     AntDesignOutlined,
//     LoadingOutlined,
//     AppstoreAddOutlined
// };

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const cauHoi = {
    id: 'cau-hoi',
    title: 'Quản lý câu hỏi',
    type: 'group',
    children: [
        {
            id: 'add-cau-hoi',
            title: 'Thêm câu hỏi',
            type: 'item',
            url: '/api/cau-hoi/create'
            // icon: icons.FontSizeOutlined
        },
        {
            id: 'add-cau-hoi-kep',
            title: 'Thêm câu hỏi kép',
            type: 'item',
            url: '/api/cau-hoi-kep/create'
            // icon: icons.BgColorsOutlined
        },
        {
            id: 'cau-hoi',
            title: 'Quản lý câu hỏi',
            type: 'item',
            url: '/api/cau-hoi'
            // icon: icons.BarcodeOutlined
        }
    ]
};

export default cauHoi;

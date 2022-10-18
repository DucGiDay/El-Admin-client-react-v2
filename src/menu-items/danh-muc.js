// assets
// import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
// const icons = {
//     ChromeOutlined,
//     QuestionOutlined
// };

// ==============================|| MENU ITEMS - DANH MUC ||============================== //

const danhMuc = {
    id: 'danh-muc',
    title: 'Quản lý danh mục',
    type: 'group',
    children: [
        {
            id: 'add-danh-muc',
            title: 'Thêm danh mục',
            type: 'item',
            url: '/api/danh-muc/create'
            // icon: icons.ChromeOutlined
        },
        {
            id: 'danh-muc',
            title: 'Quản lý danh mục',
            type: 'item',
            url: '/api/danh-muc'
            // icon: icons.QuestionOutlined
        }
    ]
};

export default danhMuc;

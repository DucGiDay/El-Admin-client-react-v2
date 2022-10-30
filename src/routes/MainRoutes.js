import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import CreateDanhMuc from 'pages/components-overview/danh-muc/CreateDanhMuc';
import EditDanhMuc from 'pages/components-overview/danh-muc/EditDanhMuc';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// // render - utilities
// const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
// const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const DanhMuc = Loadable(lazy(() => import('pages/components-overview/danh-muc/')));
const CauHoi = Loadable(lazy(() => import('pages/components-overview/cau-hoi/')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'api/danh-muc',
            element: <DanhMuc />
        },
        {
            path: 'api/danh-muc/create',
            element: <CreateDanhMuc />
        },
        {
            path: 'api/danh-muc/dkt/:id',
            element: <EditDanhMuc danhMuc={ 'Dạng Kiến Thức' }/>
        },
        {
            path: 'api/danh-muc/dvkt/:id',
            element: <EditDanhMuc danhMuc={ 'Đơn Vị Kiến Thức' }/>
        },
        {
            path: 'api/danh-muc/chi-tiet/:id',
            element: <EditDanhMuc danhMuc={ 'Mô Tả Chi Tiết' }/>
        },
        {
            path: 'api/cau-hoi',
            element: <CauHoi />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        
    ]
};

export default MainRoutes;

import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// // render - utilities
const CreateDanhMuc = Loadable(lazy(() => import('pages/components-overview/danh-muc/CreateDanhMuc')));
const EditDanhMuc = Loadable(lazy(() => import('pages/components-overview/danh-muc/EditDanhMuc')));
const DanhMuc = Loadable(lazy(() => import('pages/components-overview/danh-muc/')));
const CauHoi = Loadable(lazy(() => import('pages/components-overview/cau-hoi/')));
const CreateCauHoiKep = Loadable(lazy(() => import('pages/components-overview/cau-hoi/CreateCauHoiKep')));
const CreateCauHoi = Loadable(lazy(() => import('pages/components-overview/cau-hoi/CreateCauHoi')));

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
            path: 'api/cau-hoi-kep/create',
            element: <CreateCauHoiKep />
        },
        {
            path: 'api/cau-hoi/create',
            element: <CreateCauHoi />
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

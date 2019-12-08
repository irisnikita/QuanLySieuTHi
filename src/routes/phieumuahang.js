import React from 'react';

const Phieumuahang = React.lazy(() => import('../modules/PhieuMuaHang'));

export default [
    {
        state: 'phieumuahang',
        path: '/phieumuahang',
        name: 'Phieummuahang',
        exact: true,
        component: Phieumuahang,
        resources: []
    }
];
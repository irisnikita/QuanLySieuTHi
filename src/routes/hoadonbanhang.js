import React from 'react';

const Hoadonbanhang = React.lazy(() => import('../modules/Hoadonbanhang'));

export default [
    {
        state: 'hoadonbanhang',
        path: '/hoadonbanhang',
        name: 'Hoadonbanhang',
        exact: true,
        component: Hoadonbanhang,
        resources: []
    }
];
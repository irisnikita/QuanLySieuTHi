import React from 'react';

const NhaCungCap = React.lazy(()=>import('../modules/Nhacungcap'))

export default [
    {
        state: 'nhacungcap',
        path: '/nhacungcap',
        name: 'NhaCungCap',
        exact: true,
        component: NhaCungCap,
        resources: [
            
        ]
    }
]

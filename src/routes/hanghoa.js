import React from 'react';

const HangHoa = React.lazy(() => import('../modules/HangHoa'));

export default [
    {
        state: 'hanghoa',
        path: '/hanghoa',
        name: 'Hanghoa',
        exact: true,
        component: HangHoa,
        resources: []
    }
];
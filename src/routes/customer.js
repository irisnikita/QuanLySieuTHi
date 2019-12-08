import React from 'react';

const Customer = React.lazy(() => import('../modules/Customer'));

export default [
    {
        state: 'customer',
        path: '/customer',
        name: 'Customer',
        exact: true,
        component: Customer,
        resources: []
    }
];
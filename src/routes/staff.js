import React from 'react';

const Staff = React.lazy(() => import('../modules/Staff'));

export default [
    {
        state: 'staff',
        path: '/staff',
        name: 'Staff',
        exact: true,
        component: Staff,
        resources: [
            
        ]
    }
];
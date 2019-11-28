import React from 'react';

const HomePage = React.lazy(() => import('../modules/HomePage'));

export default [
    {
        state: 'homepage',
        path: '/homepage',
        name: 'Homepage',
        exact: true,
        component: HomePage,
        resources: []
    }
];
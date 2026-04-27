import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { DashboardLayout } from './components/dashboard-layout/dashboard-layout';
import { Stats } from './components/stats/stats';
import { ServicesList } from './components/admin/services-list/services-list';
import { ServiceForm } from './components/admin/service-form/service-form';
import { UsersList } from './components/admin/users-list/users-list';
import { UserForm } from './components/admin/user-form/user-form';

import { ServiceDetail } from './components/admin/service-detail/service-detail';
import { UserDetail } from './components/admin/user-detail/user-detail';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardLayout,
        children: [
            {
                path: 'stats',
                component: Stats
            },
            {
                path: 'services',
                component: ServicesList
            },
            {
                path: 'services/new',
                component: ServiceForm
            },
            {
                path: 'services/edit/:id',
                component: ServiceForm
            },
            {
                path: 'services/view/:id',
                component: ServiceDetail
            },
            {
                path: 'users',
                component: UsersList
            },
            {
                path: 'users/new',
                component: UserForm
            },
            {
                path: 'users/edit/:id',
                component: UserForm
            },
            {
                path: 'users/view/:id',
                component: UserDetail
            }
        ]
    }
];

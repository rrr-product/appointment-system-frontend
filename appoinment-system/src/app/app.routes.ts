import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login)
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard-layout/dashboard-layout').then(m => m.DashboardLayout),
        children: [
            {
                path: 'stats',
                loadComponent: () => import('./components/stats/stats').then(m => m.Stats)
            },
            {
                path: 'services',
                loadComponent: () => import('./components/admin/service-component/services-list/services-list').then(m => m.ServicesList)
            },
            {
                path: 'services/new',
                loadComponent: () => import('./components/admin/service-component/service-form/service-form').then(m => m.ServiceForm)
            },
            {
                path: 'services/edit/:id',
                loadComponent: () => import('./components/admin/service-component/service-form/service-form').then(m => m.ServiceForm)
            },
            {
                path: 'services/view/:id',
                loadComponent: () => import('./components/admin/service-component/service-detail/service-detail').then(m => m.ServiceDetail)
            },
            {
                path: 'users',
                loadComponent: () => import('./components/admin/user-component/users-list/users-list').then(m => m.UsersList)
            },
            {
                path: 'users/new',
                loadComponent: () => import('./components/admin/user-component/user-form/user-form').then(m => m.UserForm)
            },
            {
                path: 'users/edit/:id',
                loadComponent: () => import('./components/admin/user-component/user-form/user-form').then(m => m.UserForm)
            },
            {
                path: 'users/view/:id',
                loadComponent: () => import('./components/admin/user-component/user-detail/user-detail').then(m => m.UserDetail)
            }
        ]
    }
];

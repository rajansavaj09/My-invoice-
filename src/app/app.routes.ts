import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'dash-layout',pathMatch:'full',
    },
    {
        path: 'auth-layout',
        loadChildren: () => import('./auth-layout/auth-layout.module').then(module => module.AuthLayoutModule)
    },
    {
        path:'dash-layout',
        loadChildren: () => import('./dash-layout/dash-layout.module').then(module => module.DashLayoutModule)
    }
];

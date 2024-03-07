import { Routes } from '@angular/router';

// dashboard
import { IndexComponent } from './index';

// layouts


// pages
import { AuthLayout } from './layouts/auth-layout';
import { AppLayout } from './layouts/app-layout';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            // dashboard
            { path: '', component: IndexComponent, title: 'Sales Admin | VRISTO - Multipurpose Tailwind Dashboard Template' },


            //apps
            { path: '', loadChildren: () => import('./jitPilot/jitPilot.module').then((d) => d.JitPilotModule) },

            // widgets

            // components

            // users
            { path: '', loadChildren: () => import('./users/user.module').then((d) => d.UsersModule) },

            // tables


            // pages
        ],
    },


];

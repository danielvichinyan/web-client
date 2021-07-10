import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardService } from './main/auth/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () =>
              import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'login',
        loadChildren: () => import('./main/auth/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./main/auth/register/register.module').then(m => m.RegisterModule)
      },
      {
        path: '',
        loadChildren: () => import('./main/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuardService]
      },
      {
        path: '',
        loadChildren: () => import('./main/lectures/lectures.module').then(m => m.LecturesModule),
        canActivate: [AuthGuardService]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

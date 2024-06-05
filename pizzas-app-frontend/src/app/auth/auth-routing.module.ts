import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutPageComponent } from './pages/auth-layout-page/auth-layout-page.component';
import { AuthSigninPageComponent } from './pages/auth-signin-page/auth-signin-page.component';
import { AuthSignupPageComponent } from './pages/auth-signup-page/auth-signup-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutPageComponent,
    children: [
      { path: 'sign-in', component: AuthSigninPageComponent },
      { path: 'sign-up', component: AuthSignupPageComponent },
      { path: '**', redirectTo: 'sign-in' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

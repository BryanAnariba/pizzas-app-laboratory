import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { CoreRoutingModule } from './core/core-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  // {
  //   path: 'pizzasapp',
  //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '',
    redirectTo: 'pizzasapp',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    CoreRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

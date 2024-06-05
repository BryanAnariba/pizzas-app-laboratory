import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: CoreComponent,
    children: [
      {
        path: 'home',
        component: DashboardComponent,
      },
      {
        path: 'users',
        loadChildren: () => import('./mainteances/users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'categories',
        loadChildren: () => import('./mainteances/categories/categories.module').then(m => m.CategoriesModule),
      },
      {
        path: 'products',
        loadChildren: () => import('./mainteances/products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'orders',
        loadChildren: () => import('./mainteances/orders/orders.module').then(m => m.OrdersModule),
      },
      { 
        path: '**', 
        redirectTo: 'home'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

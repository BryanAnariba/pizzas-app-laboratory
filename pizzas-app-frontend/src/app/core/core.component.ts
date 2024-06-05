import { Component } from '@angular/core';
import { MenuItem } from '../types';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.css'
})
export class CoreComponent {

  public collapse: boolean = false;
  public sidenavWith = '250px';

  public menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Home Page', route: '/dashboard/home' },
    { icon: 'group_add', label: 'Users', route: '/dashboard/users' },
    { icon: 'list', label: 'Categories', route: '/dashboard/categories' },
    { icon: 'collections_bookmark', label: 'Products', route: '/dashboard/products' },
    { icon: 'list', label: 'Orders', route: '/dashboard/orders' },
  ];

  public onChangeCollapse(): void {
    this.collapse = !this.collapse;
    this.sidenavWith = this.collapse ? '70px' : '250px';
  }

  public onLogout(): void {
    console.log('Log out')
  }
}

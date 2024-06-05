import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    CoreComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    SnackbarComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    SpinnerComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }

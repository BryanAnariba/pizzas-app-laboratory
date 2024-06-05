import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signin-page',
  templateUrl: './auth-signin-page.component.html',
  styleUrl: './auth-signin-page.component.css'
})
export class AuthSigninPageComponent {
  
  public signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email], []],
    password: ['', [Validators.required, Validators.minLength(6)], []],
  });

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {}

  public onSignIn(): void {
    console.log('Sign In User Works');
  }
}

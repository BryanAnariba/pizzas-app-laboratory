import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../../enums';

@Component({
  selector: 'app-auth-signup-page',
  templateUrl: './auth-signup-page.component.html',
  styleUrl: './auth-signup-page.component.css'
})
export class AuthSignupPageComponent {

  public readonly roles: Role[] = [Role.ADMIN, Role.USER];

  public newAccountForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(6)], []],
    email: ['', [Validators.required, Validators.email], []],
    password: ['', [Validators.required, Validators.minLength(6)], []],
    role: ['', [Validators.required], []],
  });

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {}

  public onNewAccount (): void {
    console.log('Sign Up Works');
  }
}

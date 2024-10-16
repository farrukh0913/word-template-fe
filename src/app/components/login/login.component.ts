import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpRequestService } from '../../services/http-service.component';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private httpRequestService: HttpRequestService,
    private authenticationService: AuthenticationService
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.httpRequestService.postRequest('http://localhost:3000/api/login', payload).subscribe({
          next: (res) => {
            this.loginForm.reset();
            localStorage.setItem("jwtToken", JSON.stringify(res.token));
            this.snackBar.open(res.message, '', {
              duration: 1000,
            });
            this.router.navigate(['/home']);
          },
          error: async (err) => {
            this.snackBar.open(err.error.message, '', {
              duration: 1000,
            });
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get email(){ return this.loginForm.get('email')}
  get password(){ return this.loginForm.get('password')}
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpRequestService } from '../../services/http-service.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerationForm!: FormGroup;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private httpRequestService: HttpRequestService
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.registerationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      signature: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  get registerationFormControl() {
    return this.registerationForm.controls;
  }

  onSubmit() {
    if (this.registerationForm.valid) {
      const payload = {
        firstName: this.registerationForm.value.firstName,
        lastName: this.registerationForm.value.lastName,
        signature: this.registerationForm.value.signature,
        title: this.registerationForm.value.title,
        email: this.registerationForm.value.email,
        password: this.registerationForm.value.password,
      };
      this.httpRequestService.postRequest('signUp', payload).subscribe({
          next: (res) => {
            this.snackBar.open(res.message, '', {
              duration: 1000,
            });
            this.registerationForm.reset();
            this.router.navigate(['/login']);
          },
          error: async (err) => {
            console.log('err', err);
          },
        });
    } else {
      this.registerationForm.markAllAsTouched();
    }
  }

  get firstName(){ return this.registerationForm.get('firstName')}
  get lastName(){ return this.registerationForm.get('lastName')}
  get signature(){ return this.registerationForm.get('signature')}
  get title(){ return this.registerationForm.get('title')}
  get email(){ return this.registerationForm.get('email')}
  get password(){ return this.registerationForm.get('password')}
}

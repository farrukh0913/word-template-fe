import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpRequestService } from '../../services/http-service.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss'
})
export class AddPatientComponent {
  patientForm!: FormGroup;
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpRequestService: HttpRequestService
  ) {
    this.initializeForm();
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.httpRequestService.getByIdRequest(`${this.userId}/getPatientById`).subscribe({
          next: (res) => {
            this.firstName?.patchValue(res?.data.firstName);
            this.lastName?.patchValue(res?.data.lastName);
            this.dateOfBirth?.patchValue(res?.data.dateOfBirth);
            this.email?.patchValue(res?.data.email);
            this.phoneNumber?.patchValue(res?.data.phoneNumber);
            this.gender?.patchValue(res?.data.gender);
          },
          error: async (err) => {
            console.log('err', err);
          },
        });
    }
  }

  initializeForm() {
    this.patientForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }

  get patientFormControl() {
    return this.patientForm.controls;
  }

  onSubmit() {
    if (this.patientForm.valid && !this.userId) {
      const payload = {
        firstName: this.patientForm.value.firstName,
        lastName: this.patientForm.value.lastName,
        dateOfBirth: this.patientForm.value.dateOfBirth,
        email: this.patientForm.value.email,
        phoneNumber: this.patientForm.value.phoneNumber,
        gender: this.patientForm.value.gender,
      };
      this.httpRequestService.postRequest('patient', payload).subscribe({
          next: (res) => {
            this.patientForm.reset();
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
    } else if (this.patientForm.valid && this.userId) {
      const payload = {
        firstName: this.patientForm.value.firstName,
        lastName: this.patientForm.value.lastName,
        dateOfBirth: this.patientForm.value.dateOfBirth,
        email: this.patientForm.value.email,
        phoneNumber: this.patientForm.value.phoneNumber,
        gender: this.patientForm.value.gender,
      };
      this.httpRequestService.updateRequest(`${this.userId}/updatePatient`, payload).subscribe({
          next: (res) => {
            this.patientForm.reset();
            this.snackBar.open(res.message, '', {
              duration: 1000,
            });
            this.router.navigate(['/home']);
          },
          error: async (err) => {
            this.snackBar.open(err.message, '', {
              duration: 1000,
            });
          },
        });
    } else {
      this.patientForm.markAllAsTouched();
    }
  }

  get firstName() { return this.patientForm.get('firstName') }
  get lastName() { return this.patientForm.get('lastName') }
  get dateOfBirth() { return this.patientForm.get('dateOfBirth') }
  get email() { return this.patientForm.get('email') }
  get phoneNumber() { return this.patientForm.get('phoneNumber') }
  get gender() { return this.patientForm.get('gender') }
}

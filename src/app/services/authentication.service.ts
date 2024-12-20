import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-service.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private httpRequestService: HttpRequestService, private snackBar: MatSnackBar,) { }

  login(email: string, password: string){
    const payload = {
      email: email,
      password: password,
    };
    this.httpRequestService.postRequest('login', payload).subscribe({
      next: (res) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem("jwtToken", JSON.stringify(res.data.token));
        }
      },
      error: async (err) => {
        this.snackBar.open(err.error.message, '', {
          duration: 1000,
        });
      },
    });
  }
}

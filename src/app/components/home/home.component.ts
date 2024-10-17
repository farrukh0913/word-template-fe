import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router){}

  navigateToEditor(){
    const user = 'user';
    const email = 'user@gmail.com'
    const password = 'user1';
    const templateName = 'Certificate Template';
    this.router.navigate(['/template'], {
      queryParams: {
        user: encodeURIComponent(user),
        email: encodeURIComponent(email),
        password: encodeURIComponent(password),
        templateName: encodeURIComponent(templateName),
      }
    });
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}

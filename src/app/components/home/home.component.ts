import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { FormModalComponent } from '../../modals/form-modal/form-modal.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpRequestService } from '../../services/http-service.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  user: string = '';
  password: string = '';
  email: string = '';
  templateName: string = '';
  data: any;

  constructor(private router: Router, private dialog: MatDialog){ }

openDialog(): void {
  const dialogRef = this.dialog.open(FormModalComponent, {
    width: '400px',
    data: {userName: this.user, userPassword: this.password, userEmail: this.email, templateName: this.templateName}
  });

  dialogRef.afterClosed().subscribe((result: string) => {
    this.data =  result;
    this.router.navigate(['/template'], {
      queryParams: {
        user: encodeURIComponent(this.data.userName),
        email: encodeURIComponent(this.data.userEmail),
        password: encodeURIComponent(this.data.userPassword),
        templateName: encodeURIComponent(this.data.selectedTemplate),
      }
    });
  });
}

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

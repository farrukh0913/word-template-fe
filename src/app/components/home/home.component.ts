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
import { DataTransferService } from '../../services/data-transfer.service';
import {MatTableModule} from '@angular/material/table';
import { IPatient } from '../interface/patient-d-t';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule, MatTabsModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user: string = '';
  userProfile: any;
  password: string = '';
  email: string = '';
  templateName: string = '';
  data: any;
  firstName: string = '';
  lastName: string = '';
  dateOfBirth: string = '';
  displayedColumns: string[] = ['name', 'dateOfBirth', 'email', 'phoneNumber', 'gender', 'action'];
  dataSource: IPatient[] = [];


  constructor(private router: Router, private dataTransferService:DataTransferService, private httpRequestService:HttpRequestService, private dialog: MatDialog){ 
    this.userProfile  = JSON.parse(localStorage.getItem('userProfile') as any);
    this.httpRequestService.getRequest('getPatient').subscribe({
      next: (res) => {
        this.dataSource = res.data;
      },
      error: async (err) => {
        console.log('err', err);
      },
    });
  }

  sendData() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth
    }
    this.dataTransferService.setData(data);
    this.router.navigate(['/userTemplate'])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '400px',
      data: {userName: this.user, userPassword: this.password, userEmail: this.email, templateName: this.templateName}
    });
  
    dialogRef.afterClosed().subscribe((result: string) => {
      this.data =  result;
      if(this.data){
      this.router.navigate(['/template'], {
        queryParams: {
          userName: encodeURIComponent(this.data.userName),
          userEmail: encodeURIComponent(this.data.userEmail),
          userPassword: encodeURIComponent(this.data.userPassword),
          templateName: encodeURIComponent(this.data.selectedTemplate),
        }
      });
    }
    });
  }

  navigateToEditor(){
    const userFirstName = this.userProfile?.firstName;
    const userLastName = this.userProfile?.lastName;
    const userTitle = this.userProfile?.title;
    const userSignature = this.userProfile?.signature;
    const userEmail = this.userProfile?.email;
    const userPassword = this.userProfile?.password;
    const templateName = 'Prescription';
    this.router.navigate(['/template'], {
      queryParams: {
        userFirstName: encodeURIComponent(userFirstName),
        userLastName: encodeURIComponent(userLastName),
        userTitle: encodeURIComponent(userTitle),
        userSignature: encodeURIComponent(userSignature),
        userEmail: encodeURIComponent(userEmail),
        userPassword: encodeURIComponent(userPassword),
        templateName: encodeURIComponent(templateName),
      }
    });
  }

  openDocument(firstName: string, lastName: string, dateOfBirth: string){
    const userFirstName = this.userProfile?.firstName;
    const userLastName = this.userProfile?.lastName;
    const userTitle = this.userProfile?.title;
    const userSignature = this.userProfile?.signature;
    const userEmail = this.userProfile?.email;
    const userPassword = this.userProfile?.password;
    const templateName = 'Prescription';
    this.router.navigate(['/template'], {
      queryParams: {
        userFirstName: encodeURIComponent(userFirstName),
        userLastName: encodeURIComponent(userLastName),
        userTitle: encodeURIComponent(userTitle),
        userSignature: encodeURIComponent(userSignature),
        userEmail: encodeURIComponent(userEmail),
        userPassword: encodeURIComponent(userPassword),
        templateName: encodeURIComponent(templateName),
        patientFirstName: encodeURIComponent(firstName),
        patientLastName: encodeURIComponent(lastName),
        patientDateOfBirth: encodeURIComponent(dateOfBirth)
      }
    });
  }

  editUser(id: string) {
    this.router.navigate(['/addPatient/' + id]);
  }

  deleteUser(id: string) {
    this.httpRequestService.deleteRequest(`${id}/deletePatient`).subscribe({
      next: async () => {
        const index = this.dataSource.findIndex(
          (request) => request._id == id
        );
        if (index !== -1) {
          this.dataSource.splice(index, 1);
          this.dataSource = [...this.dataSource];
        }
      },
    });
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}

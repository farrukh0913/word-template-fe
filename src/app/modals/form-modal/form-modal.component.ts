import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { HttpRequestService } from '../../services/http-service.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule, MatInputModule,MatButtonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss'
})
export class FormModalComponent {

  templateNames: [] = [];

  constructor( 
    private httpRequestService: HttpRequestService,
    public dialogRef: MatDialogRef<FormModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.httpRequestService.getRequest('getAllTemplate').subscribe({
        next: (res) => {
          this.templateNames = res.data.map((template: { templateName: string; }) => template.templateName);
        },
        error: async (err) => {
          console.log('err', err);
        },
      });
     } 
  
  onCancel(): void { 
    this.dialogRef.close(); 
  } 

}

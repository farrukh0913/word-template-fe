import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-template-name-modal',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatInputModule,MatButtonModule, MatFormFieldModule],
  templateUrl: './add-template-name-modal.component.html',
  styleUrl: './add-template-name-modal.component.scss'
})
export class AddTemplateNameModalComponent {

  constructor( 
    public dialogRef: MatDialogRef<AddTemplateNameModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { } 
  
  onCancel(): void { 
    this.dialogRef.close(); 
  } 
  
}

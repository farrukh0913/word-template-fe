import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocumentEditorComponent, DocumentEditorModule } from '@txtextcontrol/tx-ng-document-editor';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { HttpRequestService } from '../../services/http-service.component';
import { AddTemplateNameModalComponent } from '../../modals/add-template-name-modal/add-template-name-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

declare const TXTextControl: any;

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatDialogModule, DocumentEditorModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent {
  @ViewChild('documentEditor', { static: false }) editor!: DocumentEditorComponent;
  templateNames: [] = [];
  templateName: string = '';
  user: string = '';
  password: string = '';
  selectedTemplate: string = '';
  email: string = '';
  token: string = '';

  @HostListener('document:txDocumentEditorLoaded', ['$event'])
  onTxDocumentEditorLoaded() {
    TXTextControl.addEventListener("textControlLoaded", () => {
      if(this.selectedTemplate){
        this.httpRequestService.getByIdRequest(`getTemplateByName?templateName=${this.selectedTemplate}`).subscribe({
            next: (res) => {
              TXTextControl.loadDocument(TXTextControl.StreamType.AdobePDF, res.template.templateContent);
            },
            error: async (err) => {
              console.log('Error fetching template:', err);
            },
          });
        }
    });
  }

  constructor(private httpRequestService: HttpRequestService, private authenticationService:AuthenticationService, private route: ActivatedRoute, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.route.queryParams.subscribe(params => {
      this.user = decodeURIComponent(params['user']);
      this.email = decodeURIComponent(params['email']);
      this.password = decodeURIComponent(params['password']);
      this.selectedTemplate = decodeURIComponent(params['templateName']);
    });
    if(this.email){this.authenticationService.login(this.email, this.password)}
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        this.token = localStorage.getItem('jwtToken') || '';
      }
    }, 1000);

     this.httpRequestService.getRequest('getAllTemplate').subscribe({
      next: (res) => {
        this.templateNames = res.data.map((template: { templateName: string; }) => template.templateName);
      },
      error: async (err) => {
        console.log('err', err);
      },
    });
  }

  downloadDocument() {
    TXTextControl.saveDocument(TXTextControl.StreamType.AdobePDF,(e: { data: string }) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:application/octet-stream;base64,' + e.data);
        element.setAttribute('download', 'results.pdf');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTemplateNameModalComponent, {
      data: { templateName: this.templateName }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.saveTemplate(result)
    });
  }

  saveTemplate(name: string) {
    TXTextControl.saveDocument(TXTextControl.StreamType.AdobePDF,(e: { data: string }) => {
        const payload = {
          templateName: name,
          templateContent: e.data,
        };
        if (payload) {
          this.httpRequestService.postRequest('createTemplate', payload).subscribe({
              next: (res) => {
                this.snackBar.open(res.message, '', {
                  duration: 1000,
                });
              },
              error: async (err) => {
                console.log('err', err);
              },
            });
        }
      }
    );
  }

  loadTemplate(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    if(selectedOption){
    this.httpRequestService.getByIdRequest(`getTemplateByName?templateName=${selectedOption}`).subscribe({
        next: (res) => {
          TXTextControl.loadDocument(TXTextControl.StreamType.AdobePDF, res.template.templateContent);
        },
        error: async (err) => {
          console.log('Error fetching template:', err);
        },
      });
    }
  }

}
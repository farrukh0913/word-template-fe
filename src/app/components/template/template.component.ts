import { Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  DocumentEditorComponent,
  DocumentEditorModule,
} from '@txtextcontrol/tx-ng-document-editor';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { HttpRequestService } from '../../services/http-service.component';
import { AddTemplateNameModalComponent } from '../../modals/add-template-name-modal/add-template-name-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormModalComponent } from '../../modals/form-modal/form-modal.component';
import { DataTransferService } from '../../services/data-transfer.service';

declare const TXTextControl: any;

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    DocumentEditorModule,
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent implements OnDestroy {
  @ViewChild('documentEditor', { static: false })
  editor!: DocumentEditorComponent;
  templateNames: [] = [];
  templateName: string = '';
  user: string = '';
  password: string = '';
  selectedTemplate: string = '';
  email: string = '';
  token: string = '';
  data: any;
  receivedData: any;

  @HostListener('document:txDocumentEditorLoaded', ['$event'])
  onTxDocumentEditorLoaded() {
    TXTextControl.addEventListener('textControlLoaded', () => {
      if (this.selectedTemplate) {
        this.httpRequestService.getByIdRequest(`getTemplateByName?templateName=${this.selectedTemplate}`).subscribe({
            next: (res) => {
              const logoPath = '../../../assets/logo-2.png';
              // TXTextControl.loadDocument(TXTextControl.StreamType.AdobePDF, res.template.templateContent);
              const htmlContent = ` <div id="content" class="certificate" style="width: 80%; margin: 0 auto; margin-top: 14px; padding: 34px; background-color: #fff; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <img class="logo" src=${logoPath} alt="logo" style="margin-bottom: 24px;">
        <p class="title" style="margin-bottom: 66px;">A qui de droit</p>
        <h1 class="title-text" style="text-align: center; font-size: 24px; font-weight: 500; margin-bottom: 28px; text-transform: uppercase; letter-spacing: 2px;">
            <u>C E R T I F I C A T E M E D I C A L</u>
        </h1>
        <p class="declaration" style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Le médecin soussigné déclare qu’en raison de son état de santé<br>
            <span class="person-info" style="font-weight: bold;">
                [Madame Monsieur] ${this.receivedData.firstName} ${this.receivedData.lastName}, [né le] [Birth date]
            </span><br>
            est en incapacité de 
        </p>
        <p class="additional-info" style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Je me tiens à disposition pour tout renseignement complémentaire, et vous prie de croire à l’expression de mes sentiments les meilleurs.
        </p>
        <p class="date" style="font-size: 16px; margin-bottom: 50px;">
            Lausanne, le [Date actuelle en long]
        </p>
        <p class="signature" style="font-size: 18px;">
            Professeur Pierre Michetti
        </p>
    </div>
`;

              const html = `<div id="content" class="report" style="width: 80%; margin: 0 auto; margin-top: 14px; padding: 34px; background-color: #fff; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
    <img class="logo" src=${logoPath} alt="logo" style="margin-bottom: 24px;">
    <p style="margin-bottom: 0;">Dr Gregory House</p>
    <p style="margin-bottom: 0;">1234</p>
    <p style="margin-bottom: 0;">Gruds 10, 2023 Lesure</p>
    <p style="margin-bottom: 0;">Tel. 0123456789/tax</p>
    <p class="report-date" style="text-align: right; margin-bottom: 0;">Leisure: 07.03.2023</p>
    <hr>

    <div class="report-date" style="text-align: right; margin-bottom: 0;">
        <p style="margin-bottom: 0;">[Title]</p>
        <p style="margin-bottom: 0;">${this.receivedData.firstName} ${this.receivedData.lastName}</p>
        <p style="margin-bottom: 0;">[Address]</p>
        <p style="margin-bottom: 0;">[ZipCode][City]</p>
        <p style="margin-bottom: 0;">[Country]</p>
    </div>

    <div class="container" style="display: flex; justify-content: flex-start; margin-bottom: 56px;">
        <span>Conc:</span>
        <div class="address" style="margin-left: 4px;">
            Frau Albert Levert geb am 08.30.2024 <br>
            Grand rue 14, 2023, lausanne,<br>
            079 000 00 00
        </div>
    </div>

    <p class="report-title" style="margin-bottom: 12px;">Dear Dr.</p>
    <p style="margin-bottom: 0;">I did see the date of my surgery on the 03.04.2024</p>

    <p class="events" style="font-weight: bold; margin-bottom: 6px; margin-top: 12px;">Reason of events</p>

    <ul style="margin-bottom: 20px;">
        <li style="list-style-type: none; margin-bottom: 12px; margin-top: 12px; font-weight: bold;">Diagnosis:</li>
        <span>[]</span>
        <li style="list-style-type: none; margin-bottom: 12px; margin-top: 12px; font-weight: bold;">Anesthetic:</li>
        <span>[]</span>
        <li style="list-style-type: none; margin-bottom: 12px; margin-top: 12px; font-weight: bold;">Allergies:</li>
        <span>[]</span>
        <li style="list-style-type: none; margin-bottom: 12px; margin-top: 12px; font-weight: bold;">Subjective:</li>
        <span>[]</span>
    </ul>

    <img class="logo page" style="margin-top:70px; margin-bottom: 24px;" src="../../../assets/logo-2.png" alt="logo">
    <p>Dr Gregory House</p>
    <p>1234</p>
    <p>Gruds 10, 2023 Lesure</p>
    <p>Tel. 0123456789/tax</p>
    <p class="date" style="margin-bottom: 0;">Leisure: 07.03.2023</p>
    <hr>

    <ul style="margin-bottom: 20px;">
        <li style="list-style-type: none; margin-bottom: 12px; margin-top: 12px; font-weight: bold;">Parameters:</li>
        <span>plots[]</span><br>
        <span>plots[]</span>
        <li style="list-style-type: none; margin-bottom: 12px; margin-top: 12px; font-weight: bold;">Plan:</li>
        <span>[]</span>
        <li style="list-style-type: none; margin-bottom: 12px; margin-top: 12px; font-weight: bold;">Assesment:</li>
        <span>[]</span>
    </ul>
</div>`;
              if (this.selectedTemplate === 'Certificate Template') {
                TXTextControl.loadDocument(
                  TXTextControl.StreamType.HTMLFormat,
                  this.toBase64(htmlContent)
                );
              } else {
                TXTextControl.loadDocument(
                  TXTextControl.StreamType.HTMLFormat,
                  this.toBase64(html)
                );
              }
            },
            error: async (err) => {
              console.log('Error fetching template:', err);
            },
          });
      }
    });
  }

  constructor(
    private httpRequestService: HttpRequestService,
    private dataTransferService: DataTransferService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.receivedData = this.dataTransferService.getData();
    this.route.queryParams.subscribe((params) => {
      this.user = decodeURIComponent(params['user']);
      this.email = decodeURIComponent(params['email']);
      this.password = decodeURIComponent(params['password']);
      this.selectedTemplate = decodeURIComponent(params['templateName']);
    });
    if (this.email) {
      this.authenticationService.login(this.email, this.password);
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        this.token = localStorage.getItem('jwtToken') || '';
      }
    }, 1000);

    this.httpRequestService.getRequest('getAllTemplate').subscribe({
      next: (res) => {
        this.templateNames = res.data.map(
          (template: { templateName: string }) => template.templateName
        );
      },
      error: async (err) => {
        console.log('err', err);
      },
    });
  }

  toBase64(str: string | number | boolean) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  downloadDocument() {
    TXTextControl.saveDocument(
      TXTextControl.StreamType.AdobePDF,
      (e: { data: string }) => {
        const element = document.createElement('a');
        element.setAttribute(
          'href',
          'data:application/octet-stream;base64,' + e.data
        );
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
      data: { templateName: this.templateName },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.saveTemplate(result);
    });
  }

  openDialogModal(): void {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '400px',
      data: {
        userName: this.user,
        userPassword: this.password,
        userEmail: this.email,
        templateName: this.templateName,
      },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.data = result;
      this.router.navigate(['/template'], {
        queryParams: {
          user: encodeURIComponent(this.data.userName),
          email: encodeURIComponent(this.data.userEmail),
          password: encodeURIComponent(this.data.userPassword),
          templateName: encodeURIComponent(this.data.selectedTemplate),
        },
      });
      this.httpRequestService
        .getByIdRequest(
          `getTemplateByName?templateName=${this.data.selectedTemplate}`
        )
        .subscribe({
          next: (res) => {
            TXTextControl.loadDocument(
              TXTextControl.StreamType.AdobePDF,
              res.template.templateContent
            );
          },
          error: async (err) => {
            console.log('Error fetching template:', err);
          },
        });
    });
  }

  navigateToEditor() {
    const user = 'user';
    const email = 'user@gmail.com';
    const password = 'user1';
    const templateName = 'Certificate Template';
    this.router.navigate(['/template'], {
      queryParams: {
        user: encodeURIComponent(user),
        email: encodeURIComponent(email),
        password: encodeURIComponent(password),
        templateName: encodeURIComponent(templateName),
      },
    });
  }

  saveTemplate(name: string) {
    TXTextControl.saveDocument(
      TXTextControl.StreamType.AdobePDF,
      (e: { data: string }) => {
        const payload = {
          templateName: name,
          templateContent: e.data,
        };
        if (payload) {
          this.httpRequestService
            .postRequest('createTemplate', payload)
            .subscribe({
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
    if (selectedOption) {
      this.httpRequestService
        .getByIdRequest(`getTemplateByName?templateName=${selectedOption}`)
        .subscribe({
          next: (res) => {
            TXTextControl.loadDocument(
              TXTextControl.StreamType.AdobePDF,
              res.template.templateContent
            );
          },
          error: async (err) => {
            console.log('Error fetching template:', err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    // if (TXTextControl) {
    //   console.log('textcontrol', TXTextControl);
    // }
  }
}

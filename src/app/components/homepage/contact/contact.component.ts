import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SmtpService } from '../../../services/smtp.service';
import { ContactFormMailDto } from '../../../dto/contactFormMailBody.dto';
import { ADDRESS, CONTACT_EMAIL } from '../../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../snackbars/custom-snackbar/custom-snackbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  address: string;
  contactMail: string;

  FormMaxLength = {
    NAME: 50,
    EMAIL: 50,
    SUBJECT: 100,
    MESSAGE: 500,
  };

  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.FormMaxLength.NAME),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(this.FormMaxLength.EMAIL),
    ]),
    subject: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.FormMaxLength.SUBJECT),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.FormMaxLength.MESSAGE),
    ]),
  });

  loadingSubmit = false;

  constructor(
    private translate: TranslateService,
    private smtpService: SmtpService,
    private _snackBar: MatSnackBar
  ) {
    this.address = ADDRESS;
    this.contactMail = CONTACT_EMAIL;
  }

  submitForm(): void {
    if (!this.contactForm.valid) {
      return;
    }
    this.loadingSubmit = true;

    const contactFormDto: ContactFormMailDto = {
      userName: this.contactForm.value.name ?? '',
      userMail: this.contactForm.value.email ?? '',
      subject: this.contactForm.value.subject ?? '',
      message: this.contactForm.value.message ?? '',
    };
    this.smtpService
      .sendMail(contactFormDto)
      .pipe(
        finalize(() => {
          this.loadingSubmit = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.clearContactForm();
          this.openSuccessSnackBar(
            this.translate.instant('SNACKBARS.MESSAGE_SENT'),
            this.translate.instant('SHARED.OK')
          );
        },
        error: (error) =>
          this.openErrorSnackBar(
            this.translate.instant('SNACKBARS.SERVER_ERROR'),
            this.translate.instant('SHARED.OK')
          ),
      });
  }

  openSuccessSnackBar(message: string, action: string): void {
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 5000,
      data: {
        message,
        action,
      },
      panelClass: 'success-snackbar',
    });
  }

  openErrorSnackBar(message: string, action: string): void {
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 5000,
      data: {
        message,
        action,
      },
      panelClass: 'error-snackbar',
    });
  }

  clearContactForm(): void {
    this.contactForm.setValue({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  }
}

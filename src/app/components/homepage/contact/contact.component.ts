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
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  constructor(
    private translate: TranslateService,
    private smtpService: SmtpService
  ) {}

  ngOnInit() {}

  submitForm(): void {
    if (!this.contactForm.valid) {
      return;
    }

    const contactFormDto: ContactFormMailDto = {
      userName: this.contactForm.value.name ?? '',
      userMail: this.contactForm.value.email ?? '',
      subject: this.contactForm.value.subject ?? '',
      message: this.contactForm.value.message ?? '',
    };
    this.smtpService.sendMail(contactFormDto).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }
}

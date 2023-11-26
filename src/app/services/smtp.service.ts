import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactFormMailDto } from '../dto/contactFormMailBody.dto';

@Injectable({
  providedIn: 'root',
})
export class SmtpService {
  base: string = 'http://localhost:3000/smtp';

  constructor(private http: HttpClient) {}

  sendMail(contactForm: ContactFormMailDto): Observable<any> {
    return this.http.post<any>(`${this.base}/sendMail`, contactForm);
  }
}

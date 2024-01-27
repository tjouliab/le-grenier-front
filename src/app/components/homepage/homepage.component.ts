import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown.component';
import {
  ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  TRADEMARK,
} from '../../../environment';
import { AutoFocusDirective } from '../../directives/autofocus.directive';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatToolbarModule,
    RouterModule,
    TranslateModule,
    LanguageDropdownComponent,
    AutoFocusDirective,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  address: string;
  contactMail: string;
  contactPhone: string;
  trademark: string;

  constructor(private router: Router) {
    this.address = ADDRESS;
    this.contactMail = CONTACT_EMAIL;
    this.contactPhone = CONTACT_PHONE;
    this.trademark = TRADEMARK;
  }

  getAutofocus(routerLink: string): boolean {
    return this.router.url.includes(routerLink);
  }
}

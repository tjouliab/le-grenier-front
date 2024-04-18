import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown.component';
import { ADDRESS, CONTACT_EMAIL } from '../../../environment';
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

  constructor(private router: Router) {
    this.address = ADDRESS;
    this.contactMail = CONTACT_EMAIL;
  }

  getAutofocus(routerLink: string): boolean {
    return this.router.url.includes(routerLink);
  }
}

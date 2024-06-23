import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown.component';
import { ADDRESS, CONTACT_EMAIL } from '../../../environments/environment';
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

  private lastScrollTop = 0;
  protected scrollDirection: 'down' | 'up' = 'up';

  constructor(private router: Router) {
    this.address = ADDRESS;
    this.contactMail = CONTACT_EMAIL;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    let currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    this.scrollDirection =
      currentScrollTop < this.lastScrollTop ? 'up' : 'down';
    this.lastScrollTop = currentScrollTop;
  }

  getAutofocus(routerLink: string): boolean {
    return this.router.url.includes(routerLink);
  }
}

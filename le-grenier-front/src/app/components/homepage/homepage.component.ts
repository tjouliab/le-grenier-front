import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown.component';

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
  ],
  providers: [TranslateService],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  constructor(private translate: TranslateService) {}
}

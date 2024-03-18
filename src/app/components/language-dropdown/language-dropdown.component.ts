import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { MatIconModule } from '@angular/material/icon';

interface Language {
  code: string;
  name: string;
  abreviation: string;
}

@Component({
  selector: 'app-language-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.scss',
})
export class LanguageDropdownComponent {
  dropdownOpened = false;
  flagIconPath: string = '../../../assets/images/flags/';
  languagesAbreviationForm = new FormControl();
  languages: Language[] = [
    {
      code: 'fr',
      name: 'Français',
      abreviation: 'FR',
    },
    {
      code: 'en',
      name: 'English',
      abreviation: 'EN',
    },
    {
      code: 'de',
      name: 'German',
      abreviation: 'DE',
    },
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const currentLanguageCode: string = this.translate.currentLang;
    const currentLanguage = this.languages.find(
      (lang) => lang.code === currentLanguageCode
    );
    if (!currentLanguage) {
      return;
    }
    this.languagesAbreviationForm.setValue(currentLanguage.abreviation);
    this.languagesAbreviationForm.valueChanges.subscribe(
      (abreviation: string) => {
        const usedLanguage = this.languages.find(
          (lang) => lang.abreviation === abreviation
        );
        if (usedLanguage) {
          this.translate.use(usedLanguage.code);
          moment.locale(usedLanguage.code);
        }
      }
    );
  }

  getFlagIconPath(lang: Language): string {
    return `${this.flagIconPath}${lang.code}.png`;
  }

  getSelectedLanguage(abreviation: string): Language {
    return this.languages.find((lang) => lang.abreviation === abreviation);
  }

  onOpenedChange($event: boolean): void {
    this.dropdownOpened = $event;
  }
}

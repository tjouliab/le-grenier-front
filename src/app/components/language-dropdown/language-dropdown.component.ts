import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
  ],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.scss',
})
export class LanguageDropdownComponent {
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
    this.languagesAbreviationForm.valueChanges.subscribe((abreviation) => {
      const usedLanguage = this.languages.find(
        (lang) => lang.abreviation === abreviation
      );
      if (usedLanguage) {
        this.translate.use(usedLanguage.code);
      }
    });
  }
}

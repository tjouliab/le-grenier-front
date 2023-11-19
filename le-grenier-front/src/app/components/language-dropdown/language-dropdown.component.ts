import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';

interface Language {
  countryName: string;
  IsoCode: string;
}

@Component({
  selector: 'app-language-dropdown',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.scss',
})
export class LanguageDropdownComponent {
  panelColor = new FormControl('red');
  languages: Language[] = [
    {
      countryName: 'FR',
      IsoCode: 'fr',
    },
    {
      countryName: 'EN',
      IsoCode: 'gb',
    },
  ];
}

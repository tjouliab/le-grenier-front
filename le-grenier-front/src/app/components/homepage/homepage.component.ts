import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatToolbarModule,
    RouterModule,
    TranslateModule,
  ],
  providers: [TranslateService, TranslateStore],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  constructor(private translate: TranslateService) {}
}

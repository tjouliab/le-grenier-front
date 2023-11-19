import { Component, Injectable } from '@angular/core';
import { HomepageComponent } from './components/homepage/homepage.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomepageComponent, TranslateModule],
  providers: [TranslateService, TranslateStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
}

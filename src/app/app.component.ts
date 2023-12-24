import { Component } from '@angular/core';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/de';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomepageComponent, TranslateModule],
  providers: [TranslateService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
    this.translate.addLangs(['en', 'fr', 'de']);
    this.translate.use('fr');
    moment.locale('fr');
  }
}

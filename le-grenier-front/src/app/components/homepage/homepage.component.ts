import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}

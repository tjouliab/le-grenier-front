import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TooltipData {
  tooltipText: string;
}

export const TOOLTIP_DATA = new InjectionToken<TooltipData>('TOOLTIP_DATA');

@Component({
  selector: 'app-chef-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chef-tooltip.component.html',
  styleUrl: './chef-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChefTooltipComponent implements OnInit {
  componentLoaded = false;

  constructor(@Inject(TOOLTIP_DATA) public data: TooltipData) {}

  ngOnInit(): void {
    this.componentLoaded = true;
  }
}

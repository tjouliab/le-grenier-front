import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  EnvironmentInjector,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  createComponent,
  createEnvironmentInjector,
} from '@angular/core';
import {
  ChefTooltipComponent,
  TOOLTIP_DATA,
} from '../components/tooltips/chef-tooltip/chef-tooltip.component';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input() appTooltip = '';

  private componentRef: ComponentRef<ChefTooltipComponent> = null;

  constructor(
    private appRef: ApplicationRef,
    private elementRef: ElementRef,
    private injector: EnvironmentInjector
  ) {}

  ngOnInit(): void {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === null) {
      const environmentInjector = createEnvironmentInjector(
        [
          {
            provide: TOOLTIP_DATA,
            useValue: { tooltipText: this.appTooltip },
          },
        ],
        this.injector
      );

      this.componentRef = createComponent(ChefTooltipComponent, {
        environmentInjector,
      });
      this.appRef.attachView(this.componentRef.hostView);

      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      const rect = this.elementRef.nativeElement.getBoundingClientRect();

      domElem.style.position = 'absolute';
      domElem.style.top = `${rect.bottom + window.scrollY}px`;
      domElem.style.left = `${rect.left + window.scrollX}px`;

      document.body.appendChild(domElem);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}

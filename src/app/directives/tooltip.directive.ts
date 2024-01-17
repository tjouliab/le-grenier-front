import {
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {
  ChefTooltipComponent,
  TOOLTIP_DATA,
} from '../components/tooltips/chef-tooltip/chef-tooltip.component';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input() appTooltip = '';

  private overlayRef: OverlayRef = null;

  constructor(
    private element: ElementRef<HTMLElement>,
    private overlay: Overlay,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    if (this.overlayRef === null) {
      const positionStrategy = this.getPositionStrategy();
      this.overlayRef = this.overlay.create({ positionStrategy });
    }
  }

  @HostListener('mouseenter')
  showTooltip(): void {
    if (this.overlayRef?.hasAttached() === true) {
      return;
    }
    this.attachTooltip();
  }

  @HostListener('mouseleave')
  hideTooltip(): void {
    if (this.overlayRef?.hasAttached() === true) {
      this.overlayRef?.detach();
    }
  }

  private attachTooltip(): void {
    if (this.overlayRef === null) {
      return;
    }

    const injector = Injector.create({
      providers: [
        {
          provide: TOOLTIP_DATA,
          useValue: this.appTooltip,
        },
      ],
    });
    const component = new ComponentPortal(
      ChefTooltipComponent,
      this.viewContainer,
      injector
    );
    this.overlayRef.attach(component);
  }

  private getPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.element)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          panelClass: 'bottom',
        },
      ]);
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }
}

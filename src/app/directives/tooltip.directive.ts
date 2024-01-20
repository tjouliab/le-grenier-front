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
  TooltipData,
} from '../components/tooltips/chef-tooltip/chef-tooltip.component';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input() appTooltip: TooltipData;

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
  @HostListener('focus')
  showTooltip(): void {
    if (this.overlayRef?.hasAttached() === true) {
      return;
    }
    this.attachTooltip();
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  hideTooltip(): void {
    if (this.overlayRef?.hasAttached() === true) {
      this.overlayRef?.detach();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.updatePosition();
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
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          panelClass: 'bottom-right',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          panelClass: 'top-right',
        },
      ]);
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }
}

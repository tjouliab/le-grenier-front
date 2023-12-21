import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[autofocus]',
  standalone: true,
})
export class AutoFocusDirective {
  @Input()
  autofocus: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.autofocus) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background-color',
        'rgba(0, 0, 0, 0.15)'
      );
    } else {
      this.renderer.removeStyle(
        this.elementRef.nativeElement,
        'background-color'
      );
    }
  }
}

import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

@Directive({
  selector: '[appImageCompare]',
  standalone: true,
})
export class ImageCompareDirective {
  changePosition = output<number>();

  private isDragging = false;

  private readonly element = inject(ElementRef);

  @HostListener('mousedown')
  onMouseDown(): void {
    this.isDragging = true;
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isDragging = false;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isDragging = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove({ clientX }: MouseEvent): void {
    if (this.isDragging) {
      const { left, width } =
        this.element.nativeElement.getBoundingClientRect();
      const beforeWidth = clientX - left;
      const calculatedWidth = Math.max(0, Math.min(beforeWidth, width));

      this.changePosition.emit(calculatedWidth);
    }
  }
}

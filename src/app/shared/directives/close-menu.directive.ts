import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appCloseMenu]',
  standalone: true,
})
export class CloseMenuDirective implements OnInit, OnDestroy {
  private readonly element = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  closeMenu = output<boolean>();
  private documentClickListener?: () => void;

  ngOnInit() {
    this.addClickListener();
  }

  ngOnDestroy() {
    this.removeClickListener();
  }

  private addClickListener() {
    this.documentClickListener = this.renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => {
        if (!this.element.nativeElement.contains(event.target)) {
          this.closeMenu.emit(false);
          this.removeClickListener();
        }
      },
    );
  }

  private removeClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = undefined;
    }
  }
}

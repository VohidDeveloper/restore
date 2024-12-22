import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ImageCompareDirective } from '../../directives/image-compare.directive';

@Component({
  selector: 'app-img-compare',
  standalone: true,
  imports: [ImageCompareDirective],
  templateUrl: './image-compare.component.html',
  styleUrl: './image-compare.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCompareComponent {
  @ViewChild('slider') slider!: ElementRef;
  @ViewChild('before') before!: ElementRef;

  className = input.required<string>();

  isDragging = false;

  private readonly renderer = inject(Renderer2);

  moveSlider(interval: number) {
    this.renderer.setStyle(this.slider.nativeElement, 'left', `${interval}px`);
    this.renderer.setStyle(this.before.nativeElement, 'width', `${interval}px`);
  }
}

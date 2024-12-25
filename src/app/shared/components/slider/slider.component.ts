import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, SwiperModule], // SwiperModule ni import qiling
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  items = ['Image 1', 'Image 2', 'Image 3', 'Image 4', 'Image 5'];
}

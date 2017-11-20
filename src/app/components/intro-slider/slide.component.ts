import { Component, Input } from '@angular/core';
import { IntroSlide } from './intro-slider.component';

@Component({
  selector: 'intro-slider-slide',
  template: `
    <div class="intro-slider-slide" [style.background-image]="'url(' + this.slide.imageUrl + ')'">
        <div class="darken"></div>
        <div class="title" [innerHTML]="this.slide.title"></div>
        <div class="content"><ng-content></ng-content></div>
    </div>
  `,
  styleUrls: ['./slide.component.scss']
})
export class IntroSliderSlideComponent {
  @Input() slide: IntroSlide;
}

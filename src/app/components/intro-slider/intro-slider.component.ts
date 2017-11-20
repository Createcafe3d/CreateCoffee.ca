import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'intro-slider',
    templateUrl: './intro-slider.component.html',
    styleUrls: ['./intro-slider.component.scss']
})
export class IntroSliderComponent implements OnInit {
    slides: IntroSlide[] = [
        {
            title: '<span class="red-text">Your New Favorite Coffee</span>',
            text: 'CreateCoffee is all about providing you with great tasting coffee in your home or office.',
            imageUrl: '/assets/images/coffee-smoke.jpg'
        },
        {
            title: 'Roasted On-Demand',
            text: 'Fresh is best. All beans are roasted and packaged to order.',
            imageUrl: '/assets/images/beans.jpg'
        },
        {
            title: 'Customization',
            text: 'Download our PDF and design your own label for you bag. Great for gifts, events, and offices!',
            imageUrl: '/assets/images/coffee-laptop.jpg'
        },
    ];
    private slideshowInterval: any;
    private slideIndex: number = 0;
    private nextSlide = (stopShow: boolean = false): void => {
        if (stopShow) {
            this.stopSlideshow();
        }
        if (this.slideIndex < this.slides.length - 1) {
            this.slideIndex = this.slideIndex + 1;
        } else {
            this.slideIndex = 0;
        }
    }
    private prevSlide = (): void => {
        this.stopSlideshow();
        if (this.slideIndex > 0) {
            this.slideIndex = this.slideIndex - 1;
        } else {
            this.slideIndex = this.slides.length - 1;
        }
    }
    public setSlide = (slideIndex: number): void => {
        if (slideIndex < this.slides.length) {
            this.stopSlideshow();
            this.slideIndex = slideIndex;
        }
    }
    private startSlideshow = () => {
        this.slideshowInterval = setInterval(() => {
            this.nextSlide(false);
        }, 5000);
    }
    private stopSlideshow = () => {
        clearTimeout(this.slideshowInterval);
    }
    get sliderMargins(): string {
        return '-' + this.slideIndex * 100 + '%';
    }
    ngOnInit(): void {
        this.startSlideshow();
    }
}

export interface IntroSlide {
    title: string;
    text: string;
    imageUrl: string;
}

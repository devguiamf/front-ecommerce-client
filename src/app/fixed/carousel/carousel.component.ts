import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent{
  
  imagePreview: string;
  actualyControl: number = 0;
  imagesCarousel: any[];

  constructor() {
    this.imagesCarousel = [
      {
        control: 0,
        image: 'public/banners/banner-promo.png',
      },
      {
        control: 1,
        image: 'public/banners/banner-cash.png',
      },
      {
        control: 2,
        image: 'public/banners/banner-frete.png',
      },
    ]

    this.imagePreview = this.imagesCarousel[this.actualyControl].image;
    // this.changeImageTimer();
  }

  nextImage() {
    if (this.actualyControl < this.imagesCarousel.length - 1) {
      this.actualyControl++;
      this.imagePreview = this.imagesCarousel[this.actualyControl].image;
    }
  }

  prevImage() {
    if (this.actualyControl > 0) {
      this.actualyControl--;
      this.imagePreview = this.imagesCarousel[this.actualyControl].image;
    }
  }

  changeImageTimer() {
    if (this.actualyControl < this.imagesCarousel.length - 1) {
      this.actualyControl++;
      this.imagePreview = this.imagesCarousel[this.actualyControl].image;
    } else {
      this.actualyControl = 0;
      this.imagePreview = this.imagesCarousel[this.actualyControl].image;
    }
  }
}

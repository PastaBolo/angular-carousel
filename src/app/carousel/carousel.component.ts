import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '@angular/animations';
import { Carousel } from '../carousel.directive';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      transition('* => right', [
        style({ position: 'relative' }),
        group([
          query(':enter', [
            style({ position: 'absolute', left: '-100%' }), 
            animate(300, style({left: 0}))
          ], { optional: true }),
          query(':leave', [
            style({ position: 'absolute', left: 0 }), 
            animate(300, style({ left: '100%' }))
          ], { optional: true })
        ])
      ]),
      transition('* => left', [
        style({ position: 'relative' }),
        group([
          query(':enter', [
            style({ position: 'absolute', right: '-100%' }), 
            animate(300, style({right: 0}))
          ], { optional: true }),
          query(':leave', [
            style({ position: 'absolute', right: 0 }), 
            animate(300, style({ right: '100%' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class CarouselComponent {
  @Input() images: string[];
  @Input() cyclic;

  @ViewChild(Carousel) private carousel: Carousel;

  animating: boolean = false;

  private previousIndex: number;
  private direction: string;

  get slideDirection(): string {
    if(this.previousIndex === undefined) {
      return '';
    }
    if(this.carousel.currentIndex !== this.previousIndex) {
      this.animating = true;
      if(this.previousIndex === 0 && this.carousel.currentIndex === this.images.length - 1) {
        this.direction = 'right';
      }
      else if(this.previousIndex === this.images.length - 1 && this.carousel.currentIndex === 0) {
        this.direction = 'left';
      } else {
        this.direction = this.carousel.currentIndex > this.previousIndex ? 'left' : 'right'
      }
    }
    return this.direction;
  }

  animationDone() {
    this.direction = '';
    this.animating = false;
    this.previousIndex = this.carousel.currentIndex;
  }
}

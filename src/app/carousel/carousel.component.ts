import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core'
import { trigger, transition, animate, style, query, group } from '@angular/animations'
import { Carousel } from '../carousel.directive'
import { CarouselController } from '../carousel'

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
          query(':enter', [style({ position: 'absolute', left: '-100%' }), animate(300, style({ left: 0 }))], {
            optional: true
          }),
          query(':leave', [style({ position: 'absolute', left: 0 }), animate(300, style({ left: '100%' }))], {
            optional: true
          })
        ])
      ]),
      transition('* => left', [
        style({ position: 'relative' }),
        group([
          query(':enter', [style({ position: 'absolute', right: '-100%' }), animate(300, style({ right: 0 }))], {
            optional: true
          }),
          query(':leave', [style({ position: 'absolute', right: 0 }), animate(300, style({ right: '100%' }))], {
            optional: true
          })
        ])
      ])
    ])
  ]
})
export class CarouselComponent {
  @Input() images: string[]
  @Input() cyclic: boolean = true

  @ViewChild(Carousel) private carousel: Carousel

  previousIndex: number = 0
  private direction: string = ''

  get slideDirection(): string {
    if (this.previousIndex !== undefined && this.previousIndex !== this.carousel.currentIndex) {
      return (this.direction = this.carousel.currentIndex > this.previousIndex ? 'left' : 'right')
    }
    return this.direction
  }

  animationDone(): void {
    this.direction = ''
    this.previousIndex = this.carousel.currentIndex
  }

  previous(slider: HTMLElement, ctrl: CarouselController): void {
    if (!this.isAnimating(slider)) {
      if (this.cyclic && this.previousIndex === 0) {
        this.previousIndex = this.images.length
        ctrl.previous()
      } else if (!this.cyclic && this.previousIndex === 0) {
      } else {
        ctrl.previous()
      }
    }
  }

  next(slider: HTMLElement, ctrl: CarouselController): void {
    if (!this.isAnimating(slider)) {
      if (this.cyclic && this.previousIndex === this.images.length - 1) {
        this.previousIndex = -1
        ctrl.next()
      } else if (!this.cyclic && this.previousIndex === this.images.length - 1) {
      } else {
        ctrl.next()
      }
    }
  }

  private isAnimating(slider: HTMLElement): boolean {
    return slider.classList.contains('ng-animating')
  }
}

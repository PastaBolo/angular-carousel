import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { trigger, transition, animate, style, query, group } from '@angular/animations'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      transition('* => previous', [
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
      transition('* => next', [
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
  cyclic: boolean = false
  autoplay: boolean = true
  autoplaySpeed: number = 1500

  isAnimating(slider: HTMLElement): boolean {
    return slider.classList.contains('ng-animating')
  }
}

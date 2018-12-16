import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { trigger, transition, animate, style, query, group } from '@angular/animations'
import { coerceBooleanProperty } from '@angular/cdk/coercion'

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

  private _cyclic: boolean
  get cyclic(): boolean {
    return this._cyclic
  }
  @Input()
  set cyclic(value: boolean) {
    this._cyclic = coerceBooleanProperty(value)
  }

  private _autoplay: boolean
  get autoplay(): boolean {
    return this._autoplay
  }
  @Input()
  set autoplay(value: boolean) {
    this._autoplay = coerceBooleanProperty(value)
  }

  @Input() autoplaySpeed: number

  isAnimating(slider: HTMLElement): boolean {
    return slider.classList.contains('ng-animating')
  }
}

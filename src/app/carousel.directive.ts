import { Directive, OnInit, Input, ViewContainerRef, TemplateRef, EmbeddedViewRef } from '@angular/core'
import { coerceBooleanProperty } from '@angular/cdk/coercion'

import { CarouselContext } from './carousel'

@Directive({
  selector: '[carousel]'
})
export class Carousel implements OnInit {
  @Input('carouselFrom') items: string[]
  currentIndex: number = 0

  private _cyclic: boolean
  get cyclic(): boolean {
    return this._cyclic
  }
  @Input('carouselCyclic')
  set cyclic(value: boolean) {
    this._cyclic = coerceBooleanProperty(value)
  }

  // private _autoplay: boolean
  // get autoplay(): boolean {
  //   return this._autoplay
  // }
  // @Input('carouselAutoplay')
  // set autoplay(value: boolean) {
  //   this._autoplay = coerceBooleanProperty(value)
  // }

  private currentView: EmbeddedViewRef<any>
  private direction: string = ''

  constructor(private vcr: ViewContainerRef, private tmpl: TemplateRef<any>) {}

  ngOnInit(): void {
    this.currentView = this.vcr.createEmbeddedView<CarouselContext>(this.tmpl, {
      $implicit: this.items[this.currentIndex],
      index: this.currentIndex,
      direction: this.direction,
      controller: {
        previous: () => this.previous(),
        next: () => this.next(),
        display: (index: number) => this.display(index),
        resetDirection: () => (this.currentView.context.direction = this.direction = '')
      }
    })
  }

  private previous(): void {
    if (this.currentIndex !== 0 || this.cyclic) {
      this.currentIndex = this.modulo(this.currentIndex - 1, this.items.length)
      this.direction = 'previous'
      this.changeItem()
    }
  }

  private next(): void {
    if (this.currentIndex !== this.items.length - 1 || this.cyclic) {
      this.currentIndex = this.modulo(this.currentIndex + 1, this.items.length)
      this.direction = 'next'
      this.changeItem()
    }
  }

  private display(index: number): void {
    this.direction = this.currentIndex < index ? 'next' : 'previous'
    this.currentIndex = index
    this.changeItem()
  }

  private changeItem(): void {
    Object.assign(this.currentView.context, {
      $implicit: this.items[this.currentIndex],
      index: this.currentIndex,
      direction: this.direction
    })
  }

  private modulo = (x, n) => ((x % n) + n) % n
}

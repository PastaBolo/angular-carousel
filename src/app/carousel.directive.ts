import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  ViewContainerRef,
  TemplateRef,
  EmbeddedViewRef,
  ChangeDetectorRef
} from '@angular/core'
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion'
import { Subject, Subscription, interval } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { CarouselContext } from './carousel'

const modulo = (x, n) => ((x % n) + n) % n

@Directive({
  selector: '[carousel]'
})
export class Carousel implements OnInit, OnDestroy {
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

  private _autoplaySpeed: number
  get autoplaySpeed(): number {
    return this._autoplaySpeed
  }
  @Input('carouselAutoplaySpeed')
  set autoplaySpeed(value: number) {
    this._autoplaySpeed = coerceNumberProperty(value) || 5000
    this.autoplayerSource.next()
  }

  private autoplayerSource = new Subject()
  private autoplayerSubscription: Subscription

  private _autoplay: boolean
  get autoplay(): boolean {
    return this._autoplay
  }
  @Input('carouselAutoplay')
  set autoplay(value: boolean) {
    this._autoplay = coerceBooleanProperty(value)
    if (this.autoplay) {
      this.autoplayerSubscription = this.autoplayerSource
        .asObservable()
        .pipe(switchMap(() => interval(this.autoplaySpeed)))
        .subscribe(() => {
          this.next()
          this.cdr.detectChanges()
        })
      this.autoplayerSource.next()
    } else {
      this.unsubscribeAutoplayer()
    }
  }

  private currentView: EmbeddedViewRef<any>
  private direction: string = ''

  constructor(private vcr: ViewContainerRef, private tmpl: TemplateRef<any>, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.currentView = this.vcr.createEmbeddedView<CarouselContext>(this.tmpl, {
      $implicit: this.items[this.currentIndex],
      index: this.currentIndex,
      direction: this.direction,
      controller: {
        previous: () => (this.currentIndex !== 0 || this.cyclic) && this.previous(),
        next: () => (this.currentIndex !== this.items.length - 1 || this.cyclic) && this.next(),
        display: (index: number) => this.display(index),
        resetDirection: () => (this.currentView.context.direction = this.direction = '')
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeAutoplayer()
  }

  private previous(): void {
    this.currentIndex = modulo(this.currentIndex - 1, this.items.length)
    this.direction = 'previous'
    this.changeItem()
  }

  private next(): void {
    this.currentIndex = modulo(this.currentIndex + 1, this.items.length)
    this.direction = 'next'
    this.changeItem()
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
    this.autoplay && this.autoplayerSource.next()
  }

  private unsubscribeAutoplayer(): void {
    this.autoplayerSubscription && this.autoplayerSubscription.unsubscribe()
  }
}

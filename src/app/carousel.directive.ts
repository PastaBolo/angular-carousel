import { Directive, OnInit, Input, ViewContainerRef, TemplateRef, EmbeddedViewRef } from '@angular/core'
import { CarouselContext } from './carousel'

@Directive({
  selector: '[carousel]'
})
export class Carousel implements OnInit {
  @Input('carouselFrom') items: string[]
  @Input() currentIndex: number = 0

  private currentView: EmbeddedViewRef<any>

  constructor(private vcr: ViewContainerRef, private tmpl: TemplateRef<any>) {}

  ngOnInit(): void {
    this.currentView = this.vcr.createEmbeddedView<CarouselContext>(this.tmpl, {
      $implicit: this.items[this.currentIndex],
      index: this.currentIndex,
      controller: {
        previous: () => this.prevNext(-1),
        next: () => this.prevNext(1),
        display: (index: number) => {
          this.currentIndex = index
          this.changeItem()
        }
      }
    })
  }

  private prevNext(delta: -1 | 1): void {
    this.currentIndex = this.modulo((this.currentIndex += delta), this.items.length)
    this.changeItem()
  }

  private changeItem(): void {
    Object.assign(this.currentView.context, {
      $implicit: this.items[this.currentIndex],
      index: this.currentIndex
    })
  }

  private modulo = (x, n) => ((x % n) + n) % n
}

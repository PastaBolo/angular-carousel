import { Directive, OnInit, Input, ViewContainerRef, TemplateRef, EmbeddedViewRef } from '@angular/core'

@Directive({
  selector: '[carousel]'
})
export class Carousel implements OnInit {
  @Input('carouselFrom') elements: string[]

  currentIndex: number = 0
  private currentView: EmbeddedViewRef<any>

  constructor(private vcr: ViewContainerRef, private tmpl: TemplateRef<any>) {}

  ngOnInit(): void {
    this.currentView = this.vcr.createEmbeddedView(this.tmpl, {
      $implicit: this.elements[this.currentIndex],
      index: this.currentIndex,
      controller: {
        next: () => this.prevNext(1),
        previous: () => this.prevNext(-1),
        display: (index: number) => {
          this.currentIndex = index
          this.changeElement()
        }
      }
    })
  }

  private prevNext(delta: -1 | 1): void {
    this.currentIndex = this.modulo((this.currentIndex += delta), this.elements.length)
    this.changeElement()
  }

  private changeElement(): void {
    Object.assign(this.currentView.context, {
      $implicit: this.elements[this.currentIndex],
      index: this.currentIndex
    })
  }

  private modulo = (x, n) => ((x % n) + n) % n
}

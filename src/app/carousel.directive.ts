import { Directive, OnInit, Input, ViewContainerRef, TemplateRef, EmbeddedViewRef } from '@angular/core';

@Directive({
  selector: '[carousel]'
})
export class Carousel implements OnInit {
  @Input('carouselFrom') images: string[];

  currentIndex: number = 1;
  private currentView: EmbeddedViewRef<any>;

  constructor(private vcr: ViewContainerRef, private tmpl: TemplateRef<any>) {}

  ngOnInit(): void {
    this.currentView = this.vcr.createEmbeddedView(this.tmpl, {
      $implicit: this.images[this.currentIndex],
      index: this.currentIndex,
      controller: {
        next: () => this.prevNext(1),
        previous: () => this.prevNext(-1),
        display: (index: number) => console.log(index)
      }
    });
  }

  private prevNext(delta: -1 | 1): void {
    this.currentIndex = this.modulo(this.currentIndex += delta, this.images.length)
    this.changeImage();
  }
  
  private changeImage(): void {
    Object.assign(this.currentView.context, {
      $implicit: this.images[this.currentIndex],
      index: this.currentIndex
    });
  }

  private modulo = (x, n) => (x % n + n) % n
}

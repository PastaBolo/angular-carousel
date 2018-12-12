export interface CarouselContext {
  $implicit: any
  index: number
  controller: CarouselController
}

export interface CarouselController {
  previous: () => void
  next: () => void
  display: (index: number) => void
}

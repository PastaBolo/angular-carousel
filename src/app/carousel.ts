export interface CarouselContext {
  $implicit: any
  index: number
  direction: string
  controller: CarouselController
}

export interface CarouselController {
  previous: () => void
  next: () => void
  display: (index: number) => void
  resetDirection: () => void
}

import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'app-simple-carousel',
  templateUrl: './simple-carousel.component.html',
  styleUrls: ['./simple-carousel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleCarouselComponent {
  @Input() images: string[]
}

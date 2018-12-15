import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { Carousel } from './carousel.directive'
import { CarouselComponent } from './carousel/carousel.component'
import { Rerender } from './rerender.directive'
import { SimpleCarouselComponent } from './simple-carousel/simple-carousel.component'

@NgModule({
  declarations: [AppComponent, Carousel, CarouselComponent, Rerender, SimpleCarouselComponent],
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { Carousel } from './carousel.directive';
import { CarouselComponent } from './carousel/carousel.component';
import { RefreshView } from './refresh-view.directive';

@NgModule({
  declarations: [
    AppComponent,
    Carousel,
    CarouselComponent,
    RefreshView
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

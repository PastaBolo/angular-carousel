import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  images: string[] = [
    'https://www.pokebip.com/pokedex-images/artworks/1.png',
    'https://www.pokebip.com/pokedex-images/artworks/4.png',
    'https://www.pokebip.com/pokedex-images/artworks/7.png'
  ]
}
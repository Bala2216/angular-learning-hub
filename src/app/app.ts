import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from './Hooks/products/products';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Practice Code');
}

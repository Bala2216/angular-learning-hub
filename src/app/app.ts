import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from './Hooks/products/products';
import { Navbar } from './shared/components/navbar/navbar';
import { AuthStore } from './services/auth';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, JsonFormsModule,JsonFormsAngularMaterialModule
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  protected readonly title = signal('Practice Code');
  constructor(private auth: AuthStore) {}
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}

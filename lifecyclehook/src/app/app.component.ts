import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.user.name = 'Kanna';
    }, 2000);
  }

  title = 'Lifecyclehook';

  user = {
    name: 'Vinoth',
    gender: 'Male',
    age: 30,
  };
}

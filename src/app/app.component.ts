import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Survey Feedback App';
  currentRoute = '';
  currentRole = 'Guest';

  constructor(private router: Router, private roleService: RoleService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });

    this.roleService.role$.subscribe(role => {
      this.currentRole = role;
    });
  }
}

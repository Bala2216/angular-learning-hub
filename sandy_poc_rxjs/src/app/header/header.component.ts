import { Component, OnDestroy } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { RoleService } from '../role.service';
import { ChangeRoleComponent } from '../change-role/change-role.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, FormsModule, CommonModule, ChangeRoleComponent],
})
export class HeaderComponent implements OnDestroy {
  searchValue: string = '';
  showSearchbar: boolean = false;
  selectedRole: string = '';
  private roleSub: Subscription | undefined;

  constructor(
    private router: Router,
    private appService: AppService,
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {}

  onMenuClick() {
    this.router.navigate(['']);
  }

  onSearch(value: string): void {
    this.appService.updateSearchTerm(value);
  }
  ngOnInit() {
   this.router.events.subscribe(() => {
      if(this.router.url)
      this.showSearchbar = this.router.url.includes('view-all-employees');
    });

    this.roleSub = this.roleService.role$.subscribe(role => {
      this.selectedRole = role || '';
    });
  }

  ngOnDestroy(): void {
    this.roleSub?.unsubscribe();
  }
}


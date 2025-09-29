import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '../../models/employee.model';
import { CardHighlightDirective } from '../../directives/highlight.directive';
import { combineLatest, map } from 'rxjs';
import { UserDataService } from '../../services/user-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CardHighlightDirective,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.scss',
})
export class EmployeeCard {
  @Input() employee!: Employee;

  users: any[] = [];

  private userDataService = inject(UserDataService)

  ngOnInit(): void {
    combineLatest([
      this.userDataService.getCombinedData(),
      this.userDataService.filterText$,
    ])
      .pipe(
        map(([users, filterText]) =>
          users.filter((user) =>
            user.name.toLowerCase().includes(filterText.toLowerCase())
          )
        )
      )
      .subscribe((filtered) => {
        this.users = filtered;
        console.log(this.users);
      });
  }
}

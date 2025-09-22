import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserData } from '../modal/UserData';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  @Input() submittedData: UserData[] = [];
}

import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { CombinedCard } from "../../models/employee.model";
import { CommonModule } from "@angular/common";
import { CardHighlightDirective } from "../../directives/highlight.directive";

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [MatCardModule, CommonModule, CardHighlightDirective],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  @Input() data: CombinedCard[] = [];
}

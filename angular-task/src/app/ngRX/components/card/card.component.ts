import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { SearchComponent } from '../search/search.component';
import {
  selectCombinedData,
  selectLoading,
} from '../../store/combined.selectors';
import { loadCombined, searchCombined } from '../../store/combined.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule, SearchComponent],
})
export class CardComponent implements OnInit {
  private store = inject(Store);
  data$ = this.store.select(selectCombinedData);
  loading$ = this.store.select(selectLoading);

  ngOnInit() {
    this.store.dispatch(loadCombined());
  }

  onSearch(term: string) {
    this.store.dispatch(searchCombined({ term }));
  }
}

import { Component, inject } from '@angular/core';
import { TemplateFormComponent } from "./template-form/template-form.component";
import { DataTableComponent } from "./data-table/data-table.component";
import { UserData } from './modal/UserData';
import { ReactiveFormComponent } from "./reactive-form/reactive-form.component";
import { JsonFormComponent } from './json-form/json-form.component';
import { CombinedCard, Employee } from './work-force-managment/models/employee.model';
import { SearchBar } from './work-force-managment/components/search-bar/search-bar';
import { EmployeeCard } from './work-force-managment/components/employee-card/employee-card';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './work-force-managment/pipes/filter.pipe';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { SearchService } from './work-force-managment/services/search.service';
import { SearchComponent } from './work-force-managment/components/search/search.component';
import { CardListComponent } from './work-force-managment/components/card-list/card-list.component';
import { FilterComponent } from './ngRX2/components/filter.component';
import { UserCardComponent } from './ngRX2/components/user-card.component';
import { UserListComponent } from './ngRX2/components/user-list.component';
import { Store } from '@ngrx/store';
import { selectCartCount } from './ngRX2/store/cart.selector';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartComponent } from './ngRX2/components/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TemplateFormComponent,
    DataTableComponent,
    ReactiveFormComponent,
    JsonFormComponent,
    SearchBar,
    EmployeeCard,
    CommonModule,
    FilterPipe,
    SearchComponent,
    CardListComponent,
    FilterComponent,
    UserCardComponent,
    UserListComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CartComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  submittedData: UserData[] = [];
  latestUserData: UserData | null = null;

  employees: Employee[] = [];
  searchText = '';

  showCart = false;

  // search api
  results: CombinedCard[] = [];
  private searchTerm$ = new Subject<string>();
  private searchService = inject(SearchService);
  private store = inject(Store);
  cartCount$ = this.store.select(selectCartCount);

  ngOnInit() {
    this.searchService.searchCombined('').subscribe((data) => {
      this.results = data;
    });

    this.searchTerm$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((term) => this.searchService.searchCombined(term))
      )
      .subscribe((data) => (this.results = data));
  }

  // search api
  onSearch(term: string) {
    this.searchTerm$.next(term);
  }
  onFormSubmitted(data: UserData) {
    this.submittedData = [...this.submittedData, data];
    this.latestUserData = { ...data };
  }

  //ngRX
  filterText = '';
  onFilter(value: string) {
    this.filterText = value;
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}

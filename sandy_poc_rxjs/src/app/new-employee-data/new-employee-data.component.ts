import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-employee-data',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './new-employee-data.component.html',
  styleUrl: './new-employee-data.component.scss'
})
export class NewEmployeeDataComponent implements OnInit, OnDestroy {
  private createdSub!: Subscription;
  // data = {
  //   firstName: '',
  //   lastName: '',
  //   date: '',
  //   doj: '',
  //   autocompleteEnum: '',
  //   number: '',
  //   address: '',
  //   email: ''
  // };

  data: any;
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.createdSub = this.appService.getCreated.subscribe(data => {
      this.data = data;
    });
  }
  ngOnDestroy() {
    this.createdSub?.unsubscribe();
  }
  onCancel(){
    this.router.navigate(['']);
  }
}

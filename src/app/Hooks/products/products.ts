import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../product.model';
import { ProductsList } from '../products-list/products-list';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ProductsList],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products  {
  
  productForm!: FormGroup;
  products: Product[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      activeDate: ['', Validators.required],
    });
    console.log('ngOnInit');
  }

  addProduct(form: any): void {
    //event?.preventDefault();
    //debugger
    console.log(this.productForm)
    if (this.productForm.valid) {
      this.products.push(this.productForm.value);
      this.productForm.reset();
    }
  }

  // Lifecycle hooks
  // ngOnChanges() { console.log('ngOnChanges'); }
  // ngDoCheck() { console.log('ngDoCheck'); }
  // ngAfterContentInit() { console.log('ngAfterContentInit'); }
  // ngAfterContentChecked() { console.log('ngAfterContentChecked'); }
  // ngAfterViewInit() { console.log('ngAfterViewInit'); }
  // ngAfterViewChecked() { console.log('ngAfterViewChecked'); }
  // ngOnDestroy() { console.log('ngOnDestroy'); }

}

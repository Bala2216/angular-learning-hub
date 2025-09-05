import { Component, Input, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
         AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Product } from '../../product.model';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-products-list',
  imports: [DatePipe, CommonModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css'
})
export class ProductsList implements OnInit, OnChanges, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() products: Product[] = [];

  ngOnInit() { console.log('Child: ngOnInit'); }
  ngOnChanges() { console.log('Child: ngOnChanges'); }
  ngDoCheck() { console.log('Child: ngDoCheck'); }
  ngAfterContentInit() { console.log('Child: ngAfterContentInit'); }
  ngAfterContentChecked() { console.log('Child: ngAfterContentChecked'); }
  ngAfterViewInit() { console.log('Child: ngAfterViewInit'); }
  ngAfterViewChecked() { console.log('Child: ngAfterViewChecked'); }
  ngOnDestroy() { console.log('Child: ngOnDestroy'); }

}

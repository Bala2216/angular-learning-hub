import { Component, Input, SimpleChanges, OnChanges, ChangeDetectorRef, ContentChild, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-emp-details',
  standalone: true,
  imports: [],
  templateUrl: './emp-details.component.html',
  styleUrl: './emp-details.component.css'
})
export class EmpDetailsComponent implements OnChanges {
  @ViewChild("BHeader", { read: ElementRef }) hRef: ElementRef | any;
  @Input() empDetails: any
  counter: number = 0
  oldTheData: string | any;
  data: string[] = ['initial'];

  constructor(private changeDetector: ChangeDetectorRef, private renderer: Renderer2) {
    this.changeDetector.detach(); // lets the class perform its own change detection

    setTimeout(() => {
      this.oldTheData = 'final'; // intentional error
      this.data.push('intermediate');
    }, 3000);

    setTimeout(() => {
      this.data.push('final');
      this.changeDetector.markForCheck();
    }, 6000);
  }

  //ngAfterContentInit hook fired and set the Background color of h1 tag to yellow
  ngAfterContentInit() {
    console.log('ngAfterContentInit fired')
    this?.renderer?.setStyle(this?.hRef?.nativeElement, 'background-color', 'yellow')
  }
  ngAfterContentChecked() {
    this?.renderer?.setStyle(this?.hRef?.nativeElement, 'background-color', this.randomRGB());
  }

  //ngOnInit
  ngOnInit() {
    // this.empDetails={EmpName:'Ravi',EmpDept:'Sales',EmpSalary:'1000'}
  }

  //ngOnDestroy fired when componenet unload
  ngOnDestroy() {
    console.log('component is destoyed')
  }

  //ngDoCheck fired whenever any changes detect in component
  ngDoCheck() {
    console.log(this.counter++)
    if (this.data[this.data.length - 1] !== this.oldTheData) {
      this.changeDetector.detectChanges();
      console.log('change detector fired')
    }
  }

  //ngOnChanges fired before ngOnInit
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChange Fired')
    this.counter++;
  }
  randomRGB(): string {
    return `rgb(${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)})`;
  }
}

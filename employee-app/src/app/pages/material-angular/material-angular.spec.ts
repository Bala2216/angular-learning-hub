import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialAngular } from './material-angular';

describe('MaterialAngular', () => {
  let component: MaterialAngular;
  let fixture: ComponentFixture<MaterialAngular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialAngular]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialAngular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

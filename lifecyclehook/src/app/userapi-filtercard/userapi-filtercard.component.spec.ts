import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserapiFiltercardComponent } from './userapi-filtercard.component';

describe('UserapiFiltercardComponent', () => {
  let component: UserapiFiltercardComponent;
  let fixture: ComponentFixture<UserapiFiltercardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserapiFiltercardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserapiFiltercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonformsIo } from './jsonforms-io';

describe('JsonformsIo', () => {
  let component: JsonformsIo;
  let fixture: ComponentFixture<JsonformsIo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonformsIo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonformsIo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

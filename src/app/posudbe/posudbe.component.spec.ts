import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosudbeComponent } from './posudbe.component';

describe('PosudbeComponent', () => {
  let component: PosudbeComponent;
  let fixture: ComponentFixture<PosudbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosudbeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosudbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

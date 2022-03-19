import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZanrDetailComponent } from './zanr-detail.component';

describe('ZanroviDetailComponent', () => {
  let component: ZanrDetailComponent;
  let fixture: ComponentFixture<ZanrDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZanrDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZanrDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

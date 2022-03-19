import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZanroviComponent } from './zanrovi.component';

describe('ZanroviComponent', () => {
  let component: ZanroviComponent;
  let fixture: ComponentFixture<ZanroviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZanroviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZanroviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

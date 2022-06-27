import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodelaTakmicaraComponent } from './dodela-takmicara.component';

describe('DodelaTakmicaraComponent', () => {
  let component: DodelaTakmicaraComponent;
  let fixture: ComponentFixture<DodelaTakmicaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodelaTakmicaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodelaTakmicaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

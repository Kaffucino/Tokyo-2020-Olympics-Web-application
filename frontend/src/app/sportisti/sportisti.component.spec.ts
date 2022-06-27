import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportistiComponent } from './sportisti.component';

describe('SportistiComponent', () => {
  let component: SportistiComponent;
  let fixture: ComponentFixture<SportistiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportistiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportistiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

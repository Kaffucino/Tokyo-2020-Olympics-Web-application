import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedaljeComponent } from './medalje.component';

describe('MedaljeComponent', () => {
  let component: MedaljeComponent;
  let fixture: ComponentFixture<MedaljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedaljeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedaljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

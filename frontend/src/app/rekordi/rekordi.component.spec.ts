import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekordiComponent } from './rekordi.component';

describe('RekordiComponent', () => {
  let component: RekordiComponent;
  let fixture: ComponentFixture<RekordiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RekordiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RekordiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

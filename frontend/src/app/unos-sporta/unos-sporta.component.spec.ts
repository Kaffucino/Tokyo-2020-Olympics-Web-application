import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosSportaComponent } from './unos-sporta.component';

describe('UnosSportaComponent', () => {
  let component: UnosSportaComponent;
  let fixture: ComponentFixture<UnosSportaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosSportaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosSportaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosTakmicenjaComponent } from './unos-takmicenja.component';

describe('UnosTakmicenjaComponent', () => {
  let component: UnosTakmicenjaComponent;
  let fixture: ComponentFixture<UnosTakmicenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosTakmicenjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosTakmicenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

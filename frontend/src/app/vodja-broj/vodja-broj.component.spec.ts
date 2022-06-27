import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodjaBrojComponent } from './vodja-broj.component';

describe('VodjaBrojComponent', () => {
  let component: VodjaBrojComponent;
  let fixture: ComponentFixture<VodjaBrojComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodjaBrojComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodjaBrojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

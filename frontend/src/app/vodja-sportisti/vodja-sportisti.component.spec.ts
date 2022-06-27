import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodjaSportistiComponent } from './vodja-sportisti.component';

describe('VodjaSportistiComponent', () => {
  let component: VodjaSportistiComponent;
  let fixture: ComponentFixture<VodjaSportistiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodjaSportistiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodjaSportistiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

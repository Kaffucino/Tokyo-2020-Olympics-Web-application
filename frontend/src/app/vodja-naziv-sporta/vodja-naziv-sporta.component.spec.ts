import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodjaNazivSportaComponent } from './vodja-naziv-sporta.component';

describe('VodjaNazivSportaComponent', () => {
  let component: VodjaNazivSportaComponent;
  let fixture: ComponentFixture<VodjaNazivSportaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodjaNazivSportaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodjaNazivSportaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

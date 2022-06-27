import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodjaDisciplineComponent } from './vodja-discipline.component';

describe('VodjaDisciplineComponent', () => {
  let component: VodjaDisciplineComponent;
  let fixture: ComponentFixture<VodjaDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodjaDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodjaDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

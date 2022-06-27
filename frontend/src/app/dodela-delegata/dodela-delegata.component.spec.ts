import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodelaDelegataComponent } from './dodela-delegata.component';

describe('DodelaDelegataComponent', () => {
  let component: DodelaDelegataComponent;
  let fixture: ComponentFixture<DodelaDelegataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodelaDelegataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodelaDelegataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

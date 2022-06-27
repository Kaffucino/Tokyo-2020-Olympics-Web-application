import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZemljeComponent } from './zemlje.component';

describe('ZemljeComponent', () => {
  let component: ZemljeComponent;
  let fixture: ComponentFixture<ZemljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZemljeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZemljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasComponent } from './toas.component';

describe('ToasComponent', () => {
  let component: ToasComponent;
  let fixture: ComponentFixture<ToasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

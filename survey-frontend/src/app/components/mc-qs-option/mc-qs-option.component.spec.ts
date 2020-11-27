import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McQsOptionComponent } from './mc-qs-option.component';

describe('McQsOptionComponent', () => {
  let component: McQsOptionComponent;
  let fixture: ComponentFixture<McQsOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McQsOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McQsOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

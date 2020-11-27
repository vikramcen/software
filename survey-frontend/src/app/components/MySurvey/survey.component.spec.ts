import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySurveyComponent } from './survey.component';

describe('SurveyComponent', () => {
  let component: MySurveyComponent;
  let fixture: ComponentFixture<MySurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

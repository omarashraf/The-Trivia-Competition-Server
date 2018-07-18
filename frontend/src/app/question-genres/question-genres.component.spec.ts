import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGenresComponent } from './question-genres.component';

describe('QuestionGenresComponent', () => {
  let component: QuestionGenresComponent;
  let fixture: ComponentFixture<QuestionGenresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGenresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

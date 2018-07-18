import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreQuestionsComponent } from './genre-questions.component';

describe('GenreQuestionsComponent', () => {
  let component: GenreQuestionsComponent;
  let fixture: ComponentFixture<GenreQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, TemplateRef } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-genre-questions',
  templateUrl: './genre-questions.component.html',
  styleUrls: ['./genre-questions.component.css']
})
export class GenreQuestionsComponent implements OnInit {

  modalRef: ModalDirective;
  genre: String = '';
  questions: any[];
  selected_questions: any[];
  public page: number = 1;
  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public numPages: number;
  public length: number;
  private modal_selected_question: any;
  successful_alert = false;
  failed_alert = false;
  correct_answer: string;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.genre = this.route.snapshot.params['genre'];
    this.questionService.getGenreQuestions(this.genre).subscribe((res) => {
      this.questions = res.json();
      this.length = this.questions.length;
      this.changePage({ page: this.page, itemsPerPage: this.itemsPerPage })
    });
  }
  changePage(page: any, data: Array<any> = this.questions) {
    this.page = page.page;
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    this.selected_questions = data.slice(start, end);
    this.successful_alert = false;
    this.failed_alert = false;
  }
  openDeleteConfirmationModal(modal: ModalDirective, question: any) {
    this.modal_selected_question = question;
    this.modalRef = modal;
    this.modalRef.show();
  }
  confirmDelete() {
    this.questionService.deleteQuestion(this.modal_selected_question._id).subscribe((res) => {
      this.successful_alert = true;
      this.questions.filter((question) => {
        if (question._id == this.modal_selected_question._id) {
          this.questions.splice(this.questions.indexOf(question), 1);
        }
      });
      this.changePage({ page: this.page, itemsPerPage: this.itemsPerPage });
    }, (err) => {
      this.failed_alert = true;
    });
    this.modalRef.hide();
  }
  close() {
    this.modalRef.hide();
  }
  openEditModal(modal: ModalDirective, question: any) {
    this.modal_selected_question = question;
    this.getCorrectAnswer();
    this.modalRef = modal;
    this.modalRef.show();
  }
  confirmEdit(form) {
    form.correct_answer = form[form.correct_answer];
    this.questionService.updateQuestion(this.modal_selected_question._id, form).subscribe((res) => {
      this.successful_alert = true;
      let questionIndex = this.questions.findIndex(question => question._id == this.modal_selected_question._id);
      this.questions[questionIndex] = res.json();
      this.changePage({ page: this.page, itemsPerPage: this.itemsPerPage })
    }, (err) => {
      this.failed_alert = true;
    });
    this.modalRef.hide();
  }
  getCorrectAnswer() {
    this.correct_answer = Object.keys(this.modal_selected_question)[Object.values(this.modal_selected_question).findIndex((answer) => answer == this.modal_selected_question.correct_answer)];
  }
}

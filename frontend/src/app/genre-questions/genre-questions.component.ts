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
  selectedQuestions: any[];
  public page: number = 1;
  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public numPages: number;
  public length: number;
  private modalSelectedQuestion: any;
  successfulAlert = false;
  failedAlert = false;
  correctAnswer: string;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.genre = this.route.snapshot.params['genre'];
    this.questionService.getGenreQuestions(this.genre).subscribe((res) => {
      this.questions = res.json();
      this.length = this.questions.length;
      this.changePage({ page: this.page, itemsPerPage: this.itemsPerPage });
    });
  }
  changePage(page: any, data: Array<any> = this.questions) {
    this.hideAlerts();
    this.page = page.page;
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    this.selectedQuestions = data.slice(start, end);
    if(this.selectedQuestions.length <= 0) {
        this.router.navigate(['./admin/dashboard']);
    }
  }
  openDeleteConfirmationModal(modal: ModalDirective, question: any) {
    this.hideAlerts();
    this.modalSelectedQuestion = question;
    this.modalRef = modal;
    this.modalRef.show();
  }
  confirmDelete() {
    this.hideAlerts();
    this.questionService.deleteQuestion(this.modalSelectedQuestion._id).subscribe((res) => {
      this.successfulAlert = true;
      this.questions.filter((question) => {
        if (question._id == this.modalSelectedQuestion._id) {
          this.questions.splice(this.questions.indexOf(question), 1);
        }
      });
      this.changePage({ page: this.page, itemsPerPage: this.itemsPerPage });
    }, (err) => {
      this.failedAlert = true;
    });
    this.modalRef.hide();
    this.successfulAlert = true;
  }
  openEditModal(modal: ModalDirective, question: any) {
    this.hideAlerts();
    this.modalSelectedQuestion = question;
    this.getCorrectAnswer();
    this.modalRef = modal;
    this.modalRef.show();
  }
  confirmEdit(form) {
    this.hideAlerts();
    form.correct_answer = form[form.correct_answer];
    this.questionService.updateQuestion(this.modalSelectedQuestion._id, form).subscribe((res) => {
      this.successfulAlert = true;
      let questionIndex = this.questions.findIndex(question => question._id == this.modalSelectedQuestion._id);
      this.questions[questionIndex] = res.json();
      this.changePage({ page: this.page, itemsPerPage: this.itemsPerPage })
    }, (err) => {
      this.failedAlert = true;
    });
    this.modalRef.hide();
  }
  getCorrectAnswer() {
    let questionKeys = Object.keys(this.modalSelectedQuestion);
    for (let i = 0; i < questionKeys.length; i++) {
      if (this.modalSelectedQuestion[questionKeys[i]] == this.modalSelectedQuestion.correct_answer && questionKeys[i] != 'correct_answer') {
        this.correctAnswer = questionKeys[i];
      }
    }
  }
  hideAlerts() {
    this.successfulAlert = false;
    this.failedAlert = false;
  }
  close() {
    this.hideAlerts();
    this.modalRef.hide();
  }
}

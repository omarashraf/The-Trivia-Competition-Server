import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-question-genres',
  templateUrl: './question-genres.component.html',
  styleUrls: ['./question-genres.component.css']
})
export class QuestionGenresComponent implements OnInit {

  public genres: any[];
  modalRef: ModalDirective;
  successfulAlert: boolean;
  failedAlert: boolean;
  enterGenre: boolean;
  formErrorAlert: boolean;

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getGenres();
  }
  getGenres() {
    this.questionService.getQuestionGenres().subscribe((res) => {
      this.genres = res.json()['genres'];
    })
  }
  getQuestionsByGenre(genre) {
    this.router.navigate([`./questions/${genre}`])
  }
  openAddModal(modal: ModalDirective) {
    this.hideAlerts();
    this.modalRef = modal;
    this.modalRef.show();
  }
  close() {
    this.modalRef.hide();
    this.enterGenre = false;
    this.hideAlerts();
  }
  addQuestion(questionForm: NgForm) {
    this.hideAlerts();
    if (!questionForm.valid) {
      this.formErrorAlert = true;
    }
    else {
      let newQuestion = questionForm.value;
      newQuestion['genre'] = newQuestion['genre'] != 'other' ? newQuestion['genre'] : newQuestion['other_genre'];
      let correctAnswer = newQuestion['correct_answer'];
      newQuestion['correct_answer'] = newQuestion[correctAnswer];
      this.questionService.addQuestion(newQuestion).subscribe((res) => {
        if (newQuestion.other_genre) {
          this.genres.push(newQuestion['other_genre'])
        }
        this.successfulAlert = true;
      }, (err) => {
        this.failedAlert = true;
      });
      this.close();
    }
  }
  hideAlerts() {
    this.successfulAlert = false;
    this.failedAlert = false;
    this.formErrorAlert = false;
  }
}

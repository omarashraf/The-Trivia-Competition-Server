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
  successful_alert: boolean;
  failure_alert: boolean;
  enter_genre: boolean;
  error_form_alert: boolean;

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
    this.modalRef = modal;
    this.modalRef.show();
  }
  close() {
    this.modalRef.hide();
    this.enter_genre = false;
    this.error_form_alert = false;
  }
  addQuestion(question_form: NgForm) {
    if (!question_form.valid) {
      this.error_form_alert = true;
    }
    else {
      let new_question = question_form.value;
      new_question['genre'] = new_question['genre'] != 'other' ? new_question['genre'] : new_question['other_genre'];
      let correct_answer = new_question['correct_answer'];
      new_question['correct_answer'] = new_question[correct_answer];
      this.questionService.addQuestion(new_question).subscribe((res)=>{
       if(new_question.other_genre) {
         this.genres.push(new_question['other_genre'])
       }
       this.successful_alert = true; 
      },(err) => {
        console.log(err);
        this.failure_alert = true;
      });
      this.close();
    }
  }
}

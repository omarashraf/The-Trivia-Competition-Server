import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-genres',
  templateUrl: './question-genres.component.html',
  styleUrls: ['./question-genres.component.css']
})
export class QuestionGenresComponent implements OnInit {

  public genres:any[];

  constructor(
    private QuestionService: QuestionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.QuestionService.getQuestionGenres().subscribe((res) =>{
      this.genres = res.json()['genres'];
    })
  }
  public getQuestionsByGenre(genre) {
    this.router.navigate([`./questions/${genre}`])
  }
}

import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre-questions',
  templateUrl: './genre-questions.component.html',
  styleUrls: ['./genre-questions.component.css']
})
export class GenreQuestionsComponent implements OnInit {

  genre:String = '';
  questions:any[];
  selected_questions: any[];
  public page:number = 1;
  public itemsPerPage:number = 5;
  public maxSize:number = 5;
  public numPages:number;
  public length:number;

  constructor(
    private QuestionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.genre = this.route.snapshot.params['genre'];
    this.QuestionService.getGenreQuestions(this.genre).subscribe((res) => {
      this.questions = res.json();
      this.length = this.questions.length;
      this.changePage({page: this.page, itemsPerPage: this.itemsPerPage})
    });
  }
  public changePage(page:any, data:Array<any> = this.questions) {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    this.selected_questions =  data.slice(start, end);
  }
  public editQuestion(question:any) {
    console.log(question);
  }
  public deleteQuestion(question:any) {
    console.log(question);
  }
}

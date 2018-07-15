import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import "rxjs";

@Injectable()
export class QuestionService {

  public headers: Headers = new Headers();
  public domain = environment.apiUrl;

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }

  getQuestionGenres(): Observable<any> {
    return this.http.get(this.domain + "/questions/genres");
  }
  getGenreQuestions(genre): Observable<any> {
    return this.http.get(this.domain + `/questions/${genre}`);
  }
  deleteQuestion(question_id):Observable<any> {
    return this.http.delete(this.domain + `/questions/${question_id}`);
  }
  updateQuestion(question_id, new_question):Observable<any> {
    return this.http.put(this.domain + `/questions/${question_id}`, new_question);
  }
}

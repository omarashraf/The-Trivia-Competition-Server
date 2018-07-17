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
    const currentToken = localStorage.getItem('jwtToken');
    this.headers.append('Authorization', 'Bearer ' + currentToken);
  }

  getQuestionGenres(): Observable<any> {
    return this.http.get(this.domain + "/questions/genres", {headers: this.headers});
  }
  getGenreQuestions(genre): Observable<any> {
    return this.http.get(this.domain + `/questions/${genre}`, {headers: this.headers});
  }
  deleteQuestion(question_id):Observable<any> {
    return this.http.delete(this.domain + `/questions/${question_id}`, {headers: this.headers});
  }
  updateQuestion(question_id, new_question):Observable<any> {
    return this.http.put(this.domain + `/questions/${question_id}`, new_question, {headers: this.headers});
  }
  addQuestion(new_question):Observable<any> {
    return this.http.post(this.domain + '/questions', new_question, {headers: this.headers});
  }
}

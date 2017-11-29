import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

// imported services.
import { LoginService } from '../services/login.service';
import { QuestionManipulationService } from '../services/question-manipulation.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'result-comp',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {

  public topPlayers = [];
  public headers: Headers = new Headers();

  public endStatus: boolean = false;
  public timeEnd: boolean = false;
  public currentUser: string;
  public finalScore: number;

  constructor(
    private http: Http,
    private loginService: LoginService,
    private router: Router,
    private questionManipulation: QuestionManipulationService,
    private localStorageService: LocalStorageService
  ) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  // set status of the end game.
  endResult(): void {
    this.endStatus = this.questionManipulation.getWrongAnswerFlag();
    this.timeEnd = this.questionManipulation.getTimesUp();
  }

  // prompt register view, when a new user wants to play.
  playAgain(): void {
    this.questionManipulation.resetTimesUp();
    this.router.navigate(['./register']);
  }

  // get current session info
  getCurrentSession(): void {
    this.currentUser = JSON.parse(localStorage.getItem('current'))["username"];
    this.getCurrentUserScore();
  }

  // get current score of the current user.
  getCurrentUserScore(): void {
    this.loginService.getCurrentUserInfo(this.currentUser).subscribe((res) => {
      this.finalScore = res.json()[0]["score"];
    });
  }

  // get top 7 players and set end game flags.
  ngOnInit(): void {
    this.questionManipulation.topPlayers("7").subscribe((res) => {
      this.topPlayers = res.json();
    });
    this.endResult();
    this.getCurrentSession();
  }
}

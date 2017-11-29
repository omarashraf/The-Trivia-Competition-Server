import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

// imported services.
import { LoginService } from '../services/login.service';
import { QuestionManipulationService } from '../services/question-manipulation.service';

@Component({
  selector: 'leaderboard-comp',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent implements OnInit {

  public topPlayers = [];
  public headers: Headers = new Headers();

  constructor(
    private http: Http,
    private loginService: LoginService,
    private router: Router,
    private questionManipulation: QuestionManipulationService
  ) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getTopTenPlayers(): void {
    this.questionManipulation.topPlayers("8").subscribe((res) => {
      this.topPlayers = res.json();
    });
  }

  // get top 10 players.
  ngOnInit(): void {
    this.getTopTenPlayers();
    Observable.interval(10000).subscribe(x => {
      this.getTopTenPlayers();
    });
  }
}

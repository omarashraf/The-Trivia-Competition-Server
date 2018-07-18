import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// imported services.
import { LoginService } from '../services/login.service';
import { QuestionManipulationService } from '../services/question-manipulation.service';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'question-comp',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public currentUser: String = "Empty User";
  public questions: Array<any> = [
    {
      "question": "",
      "a": "",
      "b": "",
      "c": "",
      "d": "",
      "correct_answer": "",
      "genre": ""
    }
  ];
  public currentQuestionIndex: number = 0;
  public questionsLen: number = 0;
  public optionSelected = "";
  public currentScore: number = 0;
  public showAlert: boolean = false;
  public now: string = "02:00";
  public n: number = 0;
  public top3Players = [];


  constructor(
    private loginService: LoginService,
    private questionManipulation: QuestionManipulationService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  /*
    prompt the user with a new question and update score in case of
    a correct answer. Prompt an error in case of a missing answer.
    In case of a wrong answer, the leaderboard view is rendered.
    If time is up, the leaderboard and result view is prompted with
    the appropriate message.
  */
  onSubmit(): void {
    this.showAlert = false;
    let scoreAndUsername;
    if (this.optionSelected === this.questions[this.currentQuestionIndex].correct_answer) {

      /*
        - update current user score
        - update the leaderboard with the 3 top players (real-time update)
      */
      this.optionSelected = "";
      this.loginService.getCurrentUserInfo(this.currentUser).subscribe((res) => {
        this.currentScore = res.json()["score"];
        this.currentScore++;
        this.loginService.updateScore(this.currentUser, this.currentScore).subscribe((res) => {
          this.questionManipulation.topPlayers("3").subscribe((res) => {
            this.top3Players = res.json();
          });
        });
      });

      // in case a player finishes all questions, then the result view is prompted.
      this.currentQuestionIndex += 1;
      if (this.currentQuestionIndex == this.questionsLen) {
        this.router.navigate(['./result']);
      }
      else {
        localStorage.setItem('current', JSON.stringify( {email: this.currentUser, qIndex: this.currentQuestionIndex }));
      }
    }
    else {
      if (this.optionSelected === "" || this.optionSelected === undefined) {
        // error message on not selecting an answer
        this.showAlert = true;
      }
      else {
        // in case of wrong answer, the result view is prompted with current score
        this.loginService.getCurrentUserInfo(this.currentUser).subscribe((res) => {
          this.currentScore = res.json()["score"];
        });
        this.questionManipulation.wrongAnswer();
        this.router.navigate(['./result']);
      }
    }
  }

  /*
    when a user forfeit, he loses but keeps his/her last
    achieved score.
  */
  onForfeit(): void {
    this.router.navigate(['./result']);
  }

  // trigger the countdown to start and continue counting down (not used not).
  setCountdown(): void {
    let timeArray = this.now.split(/[:]+/);
    let m = timeArray[0];
    let s = timeArray[1];
    let newS = this.checkSecond(Number(s) - 1);
    let newM = Number(m);
    if (newS === "59") {
      newM = newM - 1;
    }
    this.now = newM + ":" + newS;
    if (newM == 0 && Number(newS) == 0) {
      this.loginService.getCurrentUserInfo(this.currentUser).subscribe((res) => {
        this.currentScore = res.json()["score"];
      });
      this.questionManipulation.wrongAnswer();
      this.questionManipulation.setTimesUp();
      this.router.navigate(['/result']);
    }
    setTimeout(() => {
      this.setCountdown();
    }, 1000);
  }

  // handle the seconds display regarding the countdown (not used now).
  checkSecond(sec: number): String {
    if (sec < 10 && sec >= 0) {
      return "0" + String(sec);
    }
    if (sec < 0) {
      return "59";
    }
    return String(sec);
  }

  // shuffle questions on init component.
  shuffle(): void {
    let j, x, i;
    for (i = this.questions.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this.questions[i];
        this.questions[i] = this.questions[j];
        this.questions[j] = x;
    }
  }

  // store option selected for later checks
  onChangeRadio(entry): void {
      this.optionSelected = entry;
  }

  // get current user from localStorage
  getCurrentUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('current'))["email"];
    this.loginService.getCurrentUserInfo(this.currentUser).subscribe((res) => {
      this.currentScore = res.json()["score"];
    });
  }

  /*
    on init component:
      - shuffle questions.
      - render top 3 players.
  */
  ngOnInit(): void {
    this.getCurrentUser();
    this.questionManipulation.getQuestions().subscribe((res) => {
        this.questions = res.json();
        this.questionsLen = this.questions.length;
        this.shuffle();
    });
    this.setCountdown();
    this.top3Players = [];
    this.questionManipulation.topPlayers("3").subscribe((res) => {
      this.top3Players = res.json();
    });
    this.questionManipulation.resetWrongAnswerfFlag();
  }
}

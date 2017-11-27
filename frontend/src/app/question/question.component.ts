import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

// imported services.
import { LoginService } from '../services/login.service';
import { QuestionManipulationService } from '../services/question-manipulation.service';


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
  public now: string = "04:00";
  public n: number = 0;
  public top3Players = [];

  public headers: Headers = new Headers();


  constructor(
    private loginService: LoginService,
    private questionManipulation: QuestionManipulationService,
    private http: Http,
    private router: Router
  ) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

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
      this.optionSelected = "";
      this.loginService.getCurrentUserInfo(this.currentUser).subscribe((res) => {
        console.log("CURRENT --> ", this.currentUser);
        console.log("RES --> ", res.json());
        this.currentScore = res.json()[0]["score"];
        this.currentScore++;
        scoreAndUsername = 'score=' + this.currentScore
                         + '&username=' + this.currentUser;
        this.loginService.updateScore(scoreAndUsername).subscribe((res) => {
          this.questionManipulation.topPlayers("3").subscribe((res) => {
            this.top3Players = res.json();
          });
        });
      });

      this.loginService.getSession().subscribe((res) => {
        this.currentQuestionIndex += 1;
        let newSession = "username=" + this.currentUser;
        if (this.currentQuestionIndex == this.questionsLen) {
          this.router.navigate(['./result']);
        }
        else {
          this.loginService.updateSession(newSession);
        }
      });
    }
    else {
      if (this.optionSelected === "" || this.optionSelected === undefined) {
        this.showAlert = true;
      }
      else {
        this.loginService.getCurrentUserInfo(this.currentUser).subscribe((res) => {
          this.currentScore = res.json()[0]["score"];
        });
        this.questionManipulation.wrongAnswer();
        this.router.navigate(['./result']);
      }
    }
  }

  // trigger the countdown to start and continue counting down.
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
        this.currentScore = res.json()[0]["score"];
      });
      this.questionManipulation.wrongAnswer();
      this.questionManipulation.setTimesUp();
      this.router.navigate(['/result']);
    }
    setTimeout(() => {
      this.setCountdown();
    }, 1000);
  }

  // handle the seconds display regarding the countdown.
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

  getCurrentUser(): void {
    this.loginService.getSession().subscribe((res) => {
      this.currentUser = res.json()[0]["username"];
      this.currentQuestionIndex = 0;
      let scoreAndUsername = 'score=' + 0
                       + '&username=' + this.currentUser;
      if (this.currentUser === "" || this.currentUser === undefined) {
        this.getCurrentUser();
      }
      console.log("CURRENT ONINIT --> ", this.currentUser);
      console.log("CURRENT SESSION --> ", res.json());      
      this.loginService.updateScore(scoreAndUsername).subscribe();
    });
  }

  /*
    on init component ->
      -shuffle questions.
      -get session info.
      -render top 3 players.
  */
  ngOnInit(): void {
    this.getCurrentUser();
    this.questionManipulation.getQuestions().subscribe((res) => {
        this.questions = res.json()["questions"];
        this.questionsLen = this.questions.length;
        this.shuffle();
    });
    this.questionManipulation.topPlayers("3").subscribe((res) => {
      this.top3Players = res.json();
    });
    this.questionManipulation.resetWrongAnswerfFlag();
    this.setCountdown();
  }
}

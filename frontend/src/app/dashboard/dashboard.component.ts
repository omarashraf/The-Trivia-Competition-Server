import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AdminService } from '../services/admin.service';
import { QuestionManipulationService } from '../services/question-manipulation.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  invitationErr: boolean;
  invitationSuccess: boolean;
  topPlayers:any[] = [];
  constructor(
    private http: Http,
    private adminService: AdminService,
    private questionManipulation: QuestionManipulationService
  ) { }

  ngOnInit() {
    this.adminService.getStats().subscribe((res) => {
      this.stats = res.json()['body'];
    });
    this.questionManipulation.topPlayers("10").subscribe((res) => {
      this.topPlayers = res.json();
      console.log(res);
    });
  }
  inviteAdmin(invitationForm: NgForm) {
    if (invitationForm.valid) {
      let email = invitationForm.value.email;
      this.adminService.iniviteAdmin(email).subscribe((res) => {
        this.invitationSuccess = true;
      }, (err) => {
        this.invitationErr = true;
      });
    }
  }
}

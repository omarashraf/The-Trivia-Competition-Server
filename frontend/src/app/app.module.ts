// imported modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// imported components
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';

// imported modules
import { RegisterModule } from './register/register.module';
import { QuestionModule } from './question/question.module';
import { ResultModule } from './result/result.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AdminModule } from './admin/admin.module';

// imported services
import { LoginService } from './services/login.service';
import { QuestionManipulationService } from './services/question-manipulation.service';
import { AuthService } from './services/auth.service';


const appRoutes: Routes = [
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'question', component: QuestionComponent
  },
  {
    path: 'result', component: ResultComponent
  },
  {
    path: 'leaderboard', component: LeaderboardComponent
  },
  {
    path: '', redirectTo: '/register', pathMatch: 'full'
  },
  {
    path: 'admin/login',  component: AdminComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    QuestionComponent,
    ResultComponent,
    NavbarComponent,
    LeaderboardComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    ),
    RegisterModule,
    QuestionModule,
    ResultModule,
    LeaderboardModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  providers: [
    LoginService,
    QuestionManipulationService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

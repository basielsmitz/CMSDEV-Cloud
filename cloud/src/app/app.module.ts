import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { SleeptrackerComponent } from './sleeptracker/sleeptracker.component';
import { TipsandtoolsComponent } from './tipsandtools/tipsandtools.component';
import { ContestComponent } from './contest/contest.component';
import { AppRoutingModule } from './app-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormsModule } from '@angular/forms';
import { FriendListComponent } from './friend-list/friend-list.component';
import { LogDetailComponent } from './sleeptracker/log-detail/log-detail.component';


import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AddLogComponent } from './sleeptracker/add-log/add-log.component';
import { ProfileComponent } from './friend-list/profile/profile.component';
import { StatisticsComponent } from './sleeptracker/statistics/statistics.component';
import { ArticleComponent } from './tipsandtools/article/article.component';
import { TipComponent } from './tipsandtools/tip/tip.component';
import { SwipeComponent } from './contest/swipe/swipe.component';
import { QuizComponent } from './quiz/quiz.component';
import { AddComponent } from './contest/add/add.component';
import { SchoolListComponent } from './friend-list/school-list/school-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    SleeptrackerComponent,
    TipsandtoolsComponent,
    ContestComponent,
    PagenotfoundComponent,
    FriendListComponent,
    LogDetailComponent,
    AddLogComponent,
    ProfileComponent,
    StatisticsComponent,
    ArticleComponent,
    TipComponent,
    SwipeComponent,
    QuizComponent,
    AddComponent,
    SchoolListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    LeafletModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

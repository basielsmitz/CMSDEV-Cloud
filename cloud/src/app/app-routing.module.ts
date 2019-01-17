import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { SleeptrackerComponent } from './sleeptracker/sleeptracker.component';
import { TipsandtoolsComponent } from './tipsandtools/tipsandtools.component';
import { ContestComponent } from './contest/contest.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ProfileComponent } from './friend-list/profile/profile.component';
import { ArticleComponent } from './tipsandtools/article/article.component';
import { TipComponent } from './tipsandtools/tip/tip.component';
import { AddComponent } from './contest/add/add.component';
import { SwipeComponent } from './contest/swipe/swipe.component';
import { SchoolListComponent } from './friend-list/school-list/school-list.component';
import { StatisticsComponent } from './sleeptracker/statistics/statistics.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'user', component: UserComponent},
  {path: 'friends', component: FriendListComponent},
  {path: 'friends/school', component: SchoolListComponent},
  {path: 'friends/:id', component: ProfileComponent},
  {path: 'sleeptracker', component: SleeptrackerComponent},
  {path: 'sleeptracker/statistics', component: StatisticsComponent},
  {path: 'tipsandtools', component: TipsandtoolsComponent},
  {path: 'tipsandtools/article/:id', component: ArticleComponent},
  {path: 'tipsandtools/tip/:id', component: TipComponent},
  {path: 'contest', component: ContestComponent},
  {path: 'contest/add', component: AddComponent},
  {path: 'contest/swipe', component: SwipeComponent},
  {path: '**', component: PagenotfoundComponent},
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})



export class AppRoutingModule {}

import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { DateService } from './../../date.service';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css']
})
export class LogDetailComponent implements OnInit {
  @Input() log: any;
  public sleepTimeString = null;
  public sleepGoalString = null;
  public sleepDetailString = null;
  public sleepScoreString = null;
  public userGoal = JSON.parse(localStorage.getItem('currentUser')).data.attributes.field_goal_hours;

  constructor(
    private dateService: DateService,
    ) { }

  ngOnInit() {
    console.log(this.log);
    this.formStrings();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.log);
    this.formStrings();
  }
  formStrings() {
    console.log('formingStrings');
    const previousDate = new Date(this.log.created * 1000);
    previousDate.setDate(previousDate.getDate() - 1);
    previousDate.setHours(0, 0, 0, 0);
    const wakeUp = new Date(this.log.field_wake_up_time);
    const goSleep = new Date(this.log.field_sleeping_time);
    const timeHours = Math.floor(Math.abs(wakeUp.getTime() - goSleep.getTime()) / 36e5);
    let timeMinutes = (((wakeUp.getTime() - goSleep.getTime()) / 1000) / 60);
    timeMinutes = Math.ceil(timeMinutes - (timeHours * 60));
    let timeTime = ``;
    if (timeMinutes > 0 && timeHours > 0) {
      timeTime = ` ${timeHours} uur en ${timeMinutes} minuten geslapen.`;
    } else if (timeHours > 0 && timeMinutes === 0) {
      timeTime = ` ${timeHours} uur geslapen.`;
    } else {
      timeTime = ` ${timeMinutes} minuten geslapen.`;
    }
    this.sleepTimeString = `U hebt in de nacht van ${previousDate.getDate()}` +
    ` ${this.dateService.getMonthDetail(previousDate.getMonth()).name}` +
    ` ${previousDate.getFullYear()}` +
    ` ${timeTime}`;

    const goalSleptTotalMinutes = Math.round((((wakeUp.getTime() - goSleep.getTime()) / 1000) / 60));
    const goalTotalMinutes = this.userGoal * 60;
    if (goalTotalMinutes < goalSleptTotalMinutes) {
      const difference = goalSleptTotalMinutes - goalTotalMinutes;
      const goalHours = Math.round(difference / 60);
      const goalMinutes = Math.round(difference % 60);
      let goalTime = ``;
      if (goalHours > 0 && goalMinutes > 0) {
        goalTime = `${goalHours} uur en ${goalMinutes} minuten`;
      } else if (goalHours > 0 && goalMinutes === 0) {
        goalTime = `${goalHours} uur`;
      } else {
        goalTime = `${goalHours} uur en ${goalMinutes} minuten`;
      }
      this.sleepGoalString = `Goed! U hebt ${goalTime} meer dan uw dagelijkse slaapdoel`;
    } else if (goalTotalMinutes > goalSleptTotalMinutes) {
      const difference = Math.round(Math.abs(goalTotalMinutes - goalSleptTotalMinutes));
      const goalHours = Math.round(difference / 60);
      const goalMinutes = Math.round(difference % 60);
      let goalTime = ``;
      if (goalHours > 0 && goalMinutes > 0) {
        goalTime = `${goalHours} uur en ${goalMinutes} minuten`;
      } else if (goalHours > 0 && goalMinutes === 0) {
        goalTime = `${goalHours} uur`;
      } else {
        goalTime = `${goalMinutes} minuten`;
      }
      this.sleepGoalString = `Jammer, u hebt ${goalTime} minder dan uw dagelijkse slaapdoel`;
    } else {
      this.sleepGoalString = `Proficiat u hebt uw doel behaald!`;
      console.log('goal exact');
    }
    const deepValue = (this.log.field_rating_deep_sleep < 3) ? 'niet diep' : 'diep';
    const restedValue1 = (this.log.field_rating_rested < 3) ? 'niet' : '';
    const restedValue2 = ((this.log.field_rating_rested > 3 && this.log.field_rating_deep_sleep < 3) ||
    (this.log.field_rating_rested < 3 && this.log.field_rating_deep_sleep > 3)) ? 'maar' : 'en';
    this.sleepDetailString = `Verder hebt u ${deepValue} geslapen ${restedValue2} voelde u zich ${restedValue1} uitgerust in de ochtend.`;
    this.sleepScoreString = `U gaf deze nacht een score van ${this.log.field_rating}/5!`;
  }
}

import { Component, OnInit } from '@angular/core';
import { SleepLogService } from './../sleep-log.service';
import { ContestService } from './../contest.service';
import { DateService } from './../date.service';
import { TaxonomyService } from '../taxonomy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private sleepLogService: SleepLogService,
    private contestService: ContestService,
    private dateService: DateService,
    private taxonomyService: TaxonomyService,
    ) { }
  public user = JSON.parse(localStorage.getItem('currentUser'));
  private logs = [];
  private currentDate = new Date();
  public hoursThisWeek = null;
  public sleepGoalMessage = localStorage.getItem('sleepGoalMessage');
  private days = 0;
  public contestMessage = localStorage.getItem('contestMessage');
  public likes = 0;
  ngOnInit() {
    if (this.user) {
      this.getLogs();
      this.getLatestLikes();
      this.getSchool();
      console.log(this.currentDate.getTime());
    }
  }
  getLogs() {
    const currentDay = this.currentDate.getDay();
    const _this = this;
    console.log(this.user.data.attributes.uid);
    this.sleepLogService.getLatestUserLogs(this.user.data.attributes.uid)
    .then(function (response) {
      const logs = response.data.data;
      logs.forEach((log, index) => {
        const d = new Date(log.attributes.field_datum);
        const day = d.getDay();
        if (day <= currentDay && day !== 0) {
          const hours = _this.getHours(log);
          _this.hoursThisWeek = _this.hoursThisWeek + hours;
          _this.days += 1;
        } else if (currentDay === 0 && day === 0) {
          const hours = _this.getHours(log);
          this.days = 7;
          _this.hoursThisWeek = _this.hoursThisWeek + hours;
        }
        if (index === logs.length - 1) {
          _this.formSleepGoalMessage();
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getLatestLikes() {
    const _this = this;
    this.contestService.getLatestByUser(this.user.data.attributes.uid).then(response => {
      _this.contestMessage = `Uw laatste #iwokeuplikethis foto heeft ondertussen` +
      ` ${response.data.data[0].relationships.field_likes.data.length} likes.`;
      localStorage.setItem('contestMessage', _this.contestMessage);

    });
  }
  getHours(log) {
    const wakeUp = new Date(log.attributes.field_wake_up_time);
    const goSleep = new Date(log.attributes.field_sleeping_time);
    return Math.abs(wakeUp.getTime() - goSleep.getTime()) / 36e5;
  }
  formSleepGoalMessage() {
    const goal = (this.user.data.attributes.field_goal_hours / 7) * this.days;
    let hours = null;
    let status = null;
    if (Math.floor(goal - this.hoursThisWeek) === 0) {
      status = 'goed op schema om uw slaap doel te bereiken';
    } else if (goal > this.hoursThisWeek) {
      hours = Math.floor(goal - this.hoursThisWeek);
      status = `${hours} uur achter om uw doel te bereiken`;
    } else {
      hours = Math.floor(this.hoursThisWeek - goal);
      status = `${hours} uur voor met slapen op uw doel`;
    }
    this.sleepGoalMessage = `Het is ${this.dateService.getDayName(this.currentDate.getDay())} en u ` +
    `zit deze week ${status}`;
    localStorage.setItem('sleepGoalMessage', this.sleepGoalMessage);
  }

  getSchool() {
    const _this = this;
    const tempSchools = [];
    this.taxonomyService.getSchools().then(response => {
      const school = response.data.data.filter(sch => sch.attributes.uuid === _this.user.data.relationships.field_school.data.id)[0];
      localStorage.setItem('school', JSON.stringify(
        {name: school.attributes.name, id: _this.user.data.relationships.field_school.data.id}));
    });
  }

}

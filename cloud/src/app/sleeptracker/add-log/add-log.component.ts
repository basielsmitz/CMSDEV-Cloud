import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SleepLogService } from './../../sleep-log.service';

@Component({
  selector: 'app-add-log',
  templateUrl: './add-log.component.html',
  styleUrls: ['./add-log.component.css']
})
export class AddLogComponent implements OnInit {
  @Output() logSaved = new EventEmitter<string>();
  public sleepTime = null;
  public wakeTime = null;
  public deepSleep = 3;
  public rested = 3;
  public rate = 3;
  private user = JSON.parse(localStorage.getItem('currentUser')).data;
  private date = new Date();

  constructor(
    private sleepLogService: SleepLogService,
  ) { }

  ngOnInit() {
  }
  saveLog() {
    let day = this.date.getDate().toString();
    if (day.length === 1) {
      day = '0' + day;
    }
    let month = (this.date.getMonth() + 1).toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    const data = {
      title: `${this.user.attributes.field_first_name}-${this.user.attributes.field_last_name}-` +
      `${this.date.getFullYear()}-${month}-${day}`,
      field_datum: `${this.date.getFullYear()}-${month}-${day}`,
      field_rating_deep_sleep: this.deepSleep,
      field_rating_rested: this.rested,
      field_rating: this.rate,
      field_sleeping_time: this.getDateTime(this.sleepTime, true),
      field_wake_up_time: this.getDateTime(this.wakeTime, false),
    };
    console.log(data);
    this.sleepLogService.saveLog(data).then(response => {
      console.log(response);
      this.logSaved.emit('refresh');
    }).catch(error => {
      console.log(error);
    });
  }
  getDateTime(time, sleep) {
    const fullTime = time.toString();
    const timeArray = fullTime.split(':');
    let H = timeArray[0];
    let M = timeArray[1];
    let date = null;
    if (sleep && parseInt(H, 0) > 18) {
      date = new Date(this.date);
      date.setDate(this.date.getDate() - 1);
      console.log(date);
    } else {
      date = this.date;
    }
    let day = date.getDate().toString();
    if (day.length === 1) {
      day = '0' + day;
    }
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    if (H.length === 1) {
      H = '0' + H;
    }
    if (M.length === 1) {
      M = '0' + M;
    }
    const year = date.getFullYear();

    const timeString = `${year}-${month}-${day}T${H}:${M}:00`;
    console.log(timeString);
    return timeString;
  }
}

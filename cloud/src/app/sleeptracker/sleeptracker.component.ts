import { Component, OnInit } from '@angular/core';
import { SleepLogService } from '../sleep-log.service';
import { DateService } from './../date.service';
import { last } from '@angular/router/src/utils/collection';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sleeptracker',
  templateUrl: './sleeptracker.component.html',
  styleUrls: ['./sleeptracker.component.css']
})
export class SleeptrackerComponent implements OnInit {

  constructor(
    private sleepLogService: SleepLogService,
    private dateService: DateService,
  ) { }
  private user = JSON.parse(localStorage.getItem('currentUser'));
  private newDate = new Date();
  private today = {
    data: null,
    date: this.newDate.getDate(),
    day: this.newDate.getDay(),
    month: this.newDate.getMonth() + 1,
    year: this.newDate.getFullYear(),
    fullDate: this.newDate
  };
  public month = this.newDate.getMonth();
  public year = this.newDate.getFullYear();
  private firstOfMonth = new Date(this.newDate.getFullYear(), this.month + 1, 1);
  private firstDayOfMonth = this.firstOfMonth.getDay();
  public date = this.newDate.getDate();
  public logs = [];
  public calendar = JSON.parse(localStorage.getItem('calendar'));
  private calendarArray = [];
  public calendarReady = false;
  public currentMonth = null;
  public selectedMonth = this.today.month;
  public availableMonths = JSON.parse(localStorage.getItem('availableMonths'));
  public userGoal = JSON.parse(localStorage.getItem('currentUser')).data.attributes.field_goal_hours;
  public selectedLog = null;
  public dateIsToday = false;
  ngOnInit() {
    if (JSON.parse(localStorage.getItem('logs'))) {
      this.logs = JSON.parse(localStorage.getItem('logs'));
      this.createCalendar();
    }
    this.getLogs();
    if (this.availableMonths) {
      this.setMonthList();
    } else {
      this.availableMonths = [];
    }
    this.isToday();
  }
  isToday() {

    const strippedToday = this.today.fullDate.setHours(0, 0, 0, 0);
    this.logs.forEach(log => {
      const date = new Date(log.data.field_datum);
      date.setHours(0, 0, 0, 0);
    });
    const tempToday = this.logs.filter(log => log === this.checkDate(log, strippedToday));
    if (tempToday.length < 1) {
      this.dateIsToday = true;
    } else {
      this.dateIsToday = false;
      this.selectLog(tempToday);
    }
  }
  checkDate(log, today) {
    const stripDate = new Date(log.data.field_datum);
    stripDate.setHours(0, 0, 0, 0);
    const stripNumber = stripDate.getTime();
    if (stripNumber === today) {
      return log;
    }
    return null;
  }
  setMonthList() {
  const months = JSON.parse(localStorage.getItem('availableMonths'));
  const filtered = months.filter(m => m.value === this.today.month);
  if (filtered.length < 1) {
    const month = {
      value: this.today.month,
      name: this.dateService.getMonthDetail(this.today.month - 1).name + ' ' + this.today.year,
      year: this.today.year,
    };
    months.unshift(month);
    localStorage.setItem('availableMonths', JSON.stringify(months));
  }
  this.availableMonths = months;
  }
  getDayName(day: number) {
    return this.dateService.getDayName(day);
  }

  getLogs() {
    const tempLogs = [];
    const _this = this;
    this.sleepLogService.getUserLogs(this.user.data.attributes.uid).then(response => {
      const allLogs = response.data.data;
      allLogs.forEach((log, index) => {
        const logDate = new Date(log.attributes.created * 1000);
        logDate.setHours(0, 0, 0, 0);
        const newLog = {
          data: log.attributes,
          date: logDate.getDate(),
          day: logDate.getDay(),
          month: logDate.getMonth() + 1,
          year: logDate.getFullYear(),
          fullDate: logDate
        };
        tempLogs.push(newLog);
        const month = {
          value: newLog.month,
          name: _this.dateService.getMonthDetail(newLog.month - 1).name + ' ' + newLog.year,
          year: newLog.year,
        };
        const filtered = _this.availableMonths.filter(m => m.value === month.value);
        if (filtered.length === 0) {
          _this.availableMonths.push(month);
          localStorage.setItem('availableMonths', JSON.stringify(_this.availableMonths));
        }
        if (allLogs.length - 1 === index) {
          localStorage.setItem('logs', JSON.stringify(tempLogs));
          _this.logs = _this.logs.splice(0, _this.logs.length);
          _this.logs = tempLogs;
          this.createCalendar();
        }
      });
    });
  }
  createCalendar() {
    if (this.calendar) {
      this.calendar = this.calendar.splice(0, this.calendar.length);
    }
    const currentDate = new Date(this.newDate.getFullYear(), this.newDate.getMonth() + 1, 0);
    currentDate.setHours(0, 0, 0, 0);
    const lastLog = new Date(this.logs[this.logs.length - 1].fullDate);
    const lastDate = new Date(lastLog.getFullYear(), lastLog.getMonth(), 1);
    lastDate.setHours(0, 0, 0, 0);
    let lastIndex = 0;
    while (currentDate.getTime() >= lastDate.getTime()) {
      const lastLogDate = new Date(this.logs[lastIndex].data.created * 1000);
      lastLogDate.setHours(0, 0, 0, 0);
      if (lastLogDate.getTime() === currentDate.getTime()) {
        this.calendarArray.unshift(this.logs[lastIndex]);
        if (lastIndex < this.logs.length - 1) {
          lastIndex++;
        }
      } else {
        this.calendarArray.unshift({
          data: null,
          date: currentDate.getDate(),
          day: currentDate.getDay(),
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
          fullDate: new Date(currentDate.getTime()),
        });

      }
      if (currentDate.getTime() === lastDate.getTime()) {
        this.calendar = this.calendarArray;
        this.calendarReady = true;
        this.getmonth(this.today.month);
        localStorage.setItem('calendar', JSON.stringify(this.calendar));
        this.setMonthList();
        this.isToday();
        break;
      }
      currentDate.setDate(currentDate.getDate() - 1);
    }
  }
  getmonth(monthId: number) {
    const filteredMonth =  this.calendar.filter(date => date.month === monthId);
    let start = this.calendar.indexOf(filteredMonth[0]);
    let end = this.calendar.indexOf(filteredMonth[filteredMonth.length - 1]);
    --start;
    ++end;
    if (start > 0) {
      while (this.calendar[start].day >= 1) {
        filteredMonth.unshift(this.calendar[start]);
        start--;
        if (start === 0 ) {
          filteredMonth.unshift(this.calendar[start]);
          break;
        }
      }
    } else {
      let date = filteredMonth[0];
      while (date.day > 1 || date.day === 0) {
        const newDate = new Date(date.fullDate);
        newDate.setDate(newDate.getDate() - 1);
        const newEntry = {
          data: null,
          date: newDate.getDate(),
          day: newDate.getDay(),
          month: newDate.getMonth() + 1,
          year: newDate.getFullYear(),
          fullDate: new Date(newDate.getTime()),
        };
        date = newEntry;
        filteredMonth.unshift(newEntry);
        this.calendar.unshift(newEntry);
      }
    }
    if (end < this.calendar.length)  {
      while (this.calendar[end].day <= 6 && this.calendar[end].day !== 1) {
        filteredMonth.push(this.calendar[end]);
        if (end === 6) {
          end = 0;
        } else {
          end++;
        }
        if (end === this.calendar.length - 1) {
          if (filteredMonth[filteredMonth.length - 1].day === 6) {
            filteredMonth.push(this.calendar[end]);
          }
          break;
        }
      }

    } else if (this.calendar.length === end) {
      let date = filteredMonth[filteredMonth.length - 1];
      while (date.day > 0 && date.day <= 6) {
        const newDate = new Date(date.fullDate);
        newDate.setDate(newDate.getDate() + 1);
        const newEntry = {
          data: null,
          date: newDate.getDate(),
          day: newDate.getDay(),
          month: newDate.getMonth() + 1,
          year: newDate.getFullYear(),
          fullDate: new Date(newDate.getTime()),
        };
        date = newEntry;
        filteredMonth.push(newEntry);
        this.calendar.push(newEntry);
        if (date.day === 0) {
          break;
        }
      }
    }
    this.currentMonth = filteredMonth;
  }
  changeMonth() {
    this.getmonth(this.selectedMonth);
    localStorage.setItem('calendar', JSON.stringify(this.calendar));
  }
  selectLog(date) {
    if (date) {
      if (date.data) {
        this.selectedLog = date.data;
        this.dateIsToday = false;
        console.log('oke');
      }
      const logDate = new Date(date.fullDate);
      const logWT = new Date(date.fullDate);
      const todayDate = new Date(this.today.fullDate.getTime());
      todayDate.setHours(0, 0, 0, 0);
      if (logDate.getTime() === todayDate.getTime() && !date.data) {
        this.dateIsToday = true;
        this.selectedLog = null;
      } else if (logDate.getTime() === todayDate.getTime()) {

      }
    }
  }
  setClass(date) {
    if (this.selectedMonth === date.month) {
      if (date.data) {
        const wakeUp = new Date(date.data.field_wake_up_time);
        const goSleep = new Date(date.data.field_sleeping_time);
        const hoursSlept = Math.abs(wakeUp.getTime() - goSleep.getTime()) / 36e5;
          if (hoursSlept >= this.userGoal) {
            return 'goodLog';
          }
          return 'badLog';
        }
        const logDate = new Date(date.fullDate.getTime());
        const todayDate = new Date(this.today.fullDate.getTime());
        todayDate.setHours(0, 0, 0, 0);
        if (logDate.getTime() === todayDate.getTime() && !date.data) {
          return 'todayLog';
        }
        return 'emptyLog';
    }
    return 'unavailabeLog';
  }
}

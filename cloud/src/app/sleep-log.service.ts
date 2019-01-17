import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SleepLogService {

  constructor(private httpService: HttpService) { }
  private baseUrl = 'http://slaapapp.local';
  private logs = this.baseUrl + '/jsonapi/node/sleep_log';
  getLatestUserLogs(uid) {
    const _this = this;
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - 7);
    const time = date.getTime() / 1000;
    console.log(time);

    return this.httpService.instance.get(`${this.logs}?filter[uid]=${uid}` +
    `&filter[created-filter][condition][path]=created` +
    `&filter[created-filter][condition][operator]=%3E` +
    `&filter[created-filter][condition][value]=${time}` +
    `&page[limit]=7&sort=-created`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  }
  getUserLogs(uid) {
    return this.httpService.instance.get(`${this.logs}?filter[uid]=${uid}` +
    `&sort=-created`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  }
  saveLog(data) {
    console.log('saving log');
    return this.httpService.instance.post(`${this.logs}`, {
      data: {
        type: 'node--sleep_log',
        attributes: data,
      }
    }, {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  }
}

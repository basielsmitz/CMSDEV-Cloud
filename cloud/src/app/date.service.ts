import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDayName(day: number) {
    switch (day) {
      case 0 : return 'zondag'; break;
      case 1 : return 'maandag'; break;
      case 2 : return 'dinsdag'; break;
      case 3 : return 'woensdag'; break;
      case 4 : return 'donderdag'; break;
      case 5 : return 'vrijdag'; break;
      case 6 : return 'zaterdag'; break;
      default: return null; break;
    }
  }
  getMonthDetail(month: number) {
    switch (month) {
      case 0 : return {name: 'januari', days: 31}; break;
      case 1 : return {name: 'februari', days: 29}; break;
      case 2 : return {name: 'maart', days: 31}; break;
      case 3 : return {name: 'april', days: 30}; break;
      case 4 : return {name: 'mei', days: 31}; break;
      case 5 : return {name: 'juni', days: 30}; break;
      case 6 : return {name: 'juli', days: 31}; break;
      case 7 : return {name: 'augustus', days: 31}; break;
      case 8 : return {name: 'september', days: 30}; break;
      case 9 : return {name: 'october', days: 31}; break;
      case 10 : return {name: 'november', days: 30}; break;
      case 11 : return {name: 'december', days: 31}; break;
      default: return null; break;
    }
  }
}

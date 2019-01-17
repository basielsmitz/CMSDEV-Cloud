import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TaxonomyService {

  constructor(private httpService: HttpService) { }
  private baseUrl = 'http://slaapapp.local';
  private contests = this.baseUrl + '/jsonapi/taxonomy_term/contest';
  private schools = this.baseUrl + '/jsonapi/taxonomy_term/schools';
  private sleepProfiles = this.baseUrl + '/jsonapi/taxonomy_term/sleep_profile';
  getContests() {
    return this.httpService.instance.get(`${this.contests}`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  }

  getSchools() {
    return this.httpService.instance.get(`${this.schools}`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  }

  getSleepProfiles() {
    return this.httpService.instance.get(`${this.sleepProfiles}`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  }}

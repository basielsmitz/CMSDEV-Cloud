import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor(private httpService: HttpService) { }
  private baseUrl = 'http://slaapapp.local';
  private contests = this.baseUrl + '/jsonapi/node/picture_post';
  getLatestByUser(uid) {
    return this.httpService.instance.get(`${this.contests}?filter[uid]=${uid}&page[limit]=1&sort=-created`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  }
  getAllFromScool(id) {
    return this.httpService.instance.get(`${this.contests}` +
    `?filter[field_school.uuid]=${id}&filter[status][value]=1` +
    `&include=uid,field_image,field_contest`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  }
  castLike(data, id) {
    console.log(id);
    console.log(data);
    const currentLikes = data.relationships.field_likes.data;
    currentLikes.push({
      type: 'user--user',
      id: id,
    });
    console.log(currentLikes);
    return this.httpService.instance.patch(`${this.contests}/${data.id}`, {
      data: {
        type: 'node--picture_post',
        id: data.id,
        relationships: {
          field_likes: {
            data: currentLikes
          }
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
  }
}

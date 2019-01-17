import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Router } from '@angular/router';
import { GeoEncoderService } from './geo-encoder.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router,
    private geoEncoderService: GeoEncoderService,
    ) { }
  private baseUrl = 'http://slaapapp.local';
  private users = this.baseUrl + '/jsonapi/user/user';
  getCurrentUser(fromLogin) {
    const _this = this;
    axios.get(`${this.users}?filter[name]=${localStorage.getItem('username')}&include=user_picture,field_sleep_profile,field_friends`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
    .then(function (response) {
      console.log(response);
      const user = {
        data: response.data.data[0],
        image: response.data.included.filter(object => object.type === 'file--file')[0],
        friends: response.data.included.filter(object => object.type === 'user--user'),
        sleepType: response.data.included.filter(object => object.type === 'taxonomy_term--sleep_profile')[0]
      };
      const searchString = `${user.data.attributes.field_location_street}+` +
      `${user.data.attributes.field_location_number}+` +
      `${user.data.attributes.field_location_postal}+` +
      `${user.data.attributes.field_location}+` +
      `Belgium`;
      _this.geoEncoderService.getLocationData(searchString).then(response2 => {
          console.log('testing geoencode');
          console.log(response2);
          const latLong = {
            lat: response2.data[0].lat,
            lng: response2.data[0].lon
          };
          user.data.latLong = latLong;
          localStorage.setItem('currentUser', JSON.stringify(user));
          if (fromLogin) {
            _this.router.navigate(['home']);
          }
        });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}


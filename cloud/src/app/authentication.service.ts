import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router,
    private userService: UserService,
    ) {
   }
  private baseUrl = 'http://slaapapp.local';
  private oAuth = this.baseUrl + '/oauth/token';
  private base = this.baseUrl + '/user/login?_format=json';

  setLocalStorage(response) {
    const d = new Date();
    d.setSeconds(d.getSeconds() + (response.expires_in - 15));
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('token_expiration', JSON.stringify(d.getTime()));
    localStorage.setItem('requestingToken', 'false');
  }
  login(data) {
    localStorage.setItem('username', data.username);
    const _this = this;
    axios.post(this.oAuth,
      `grant_type=password&` +
        `client_id=c4b8dc89-4061-427b-a612-1ab92a51be78&` +
        `client_secret=secret2018&` +
        `scope=mobile_app&` +
        `username=${data.username}&` +
        `password=${data.password}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        })
    .then(function (response) {
      _this.setLocalStorage(response.data);
      _this.userService.getCurrentUser(true);
    })
    .catch(function (error) {
      console.log(error);
    });
  axios.post(this.base, {name: data.username, pass: data.password},
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      localStorage.setItem('csrf_token', response.data.csrf_token);
    }).catch(error => console.log(error));
  }
  refresh() {
    const _this = this;
    return axios.post(this.oAuth,
      `grant_type=refresh_token&` +
        `refresh_token=${localStorage.getItem('refresh_token')}&` +
        `client_id=c4b8dc89-4061-427b-a612-1ab92a51be78&` +
        `client_secret=secret2018&` +
        `scope=mobile_app&`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        });
  }
}

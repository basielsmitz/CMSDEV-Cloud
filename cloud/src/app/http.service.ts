import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public instance = axios.create();
  constructor(private authenticationService: AuthenticationService) {
    const _this = this;
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    this.instance.interceptors.request.use(function (config) {
      const originalRequest = config;
      const date = new Date();
      const time = date.getTime();
      const expiration = +localStorage.getItem('token_expiration');
      console.log((expiration - time) / 1000);
      console.log(time);
      console.log(expiration);
      const requestingToken = JSON.parse(localStorage.getItem('requestingToken'));
      if (time >= expiration && !requestingToken) {
        localStorage.setItem('requestingToken', 'true');
        return authenticationService.refresh().then((response) => {
          authenticationService.setLocalStorage(response.data);
          originalRequest['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
          localStorage.setItem('requestingToken', 'false');
          return Promise.resolve(originalRequest);
        });
      }
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
  }
}

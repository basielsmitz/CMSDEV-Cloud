import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GeoEncoderService {

  constructor() { }
  private baseUrl = ' https://nominatim.openstreetmap.org/search';

  getLocationData(searchString: string) {
    return axios.get(`${this.baseUrl}?q=${searchString}&format=json`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
          },
        });
  }
}

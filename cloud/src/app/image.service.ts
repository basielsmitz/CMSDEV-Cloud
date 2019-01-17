import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private httpService: HttpService,
  ) { }
  private baseUrl = 'http://slaapapp.local';
  private contests = this.baseUrl + '/jsonapi/node/picture_post';

  upload(data) {
    console.log('upload');
    return this.httpService.instance.post(`${this.baseUrl}/file/upload/node/article/field_image?_format=json`, data,
        {
          headers: {
            'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `file; filename="${data.name}"`,
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'csrf_token': localStorage.getItem('csrf_token'),
          },
        });
  }

  post(data) {
    return this.httpService.instance.post(`${this.contests}`, data,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

  }
}


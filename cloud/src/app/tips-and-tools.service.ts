import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TipsAndToolsService {

  constructor(private httpService: HttpService) { }
  private baseUrl = 'http://slaapapp.local';
  private videos = this.baseUrl + '/jsonapi/node/video';
  private tips = this.baseUrl + '/jsonapi/node/tip';
  private memes = this.baseUrl + '/jsonapi/node/meme';
  private articles = this.baseUrl + '/jsonapi/node/article';

  getVideos() {
    return this.httpService.instance.get(`${this.videos}`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

  }
  getTips() {
    return this.httpService.instance.get(`${this.tips}`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  }
  getMemes() {
    return this.httpService.instance.get(`${this.memes}`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }
  getArticles() {
    return this.httpService.instance.get(`${this.articles}`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }
  getArticleById(id) {
    return this.httpService.instance.get(`${this.articles}/${id}?include=field_image`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }

  getTipById(id) {
    return this.httpService.instance.get(`${this.tips}/${id}`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { TipsAndToolsService } from '../tips-and-tools.service';

@Component({
  selector: 'app-tipsandtools',
  templateUrl: './tipsandtools.component.html',
  styleUrls: ['./tipsandtools.component.css']
})
export class TipsandtoolsComponent implements OnInit {

  constructor(private tipsAndToolsService: TipsAndToolsService) { }
  private allTipsAndTools = [];
  public result = [];
  private filtered = [];
  public options = [
    {name: 'All', value: 'all'},
    {name: 'Videos', value: 'node--video'},
    {name: 'Tips', value: 'node--tip'},
    {name: 'Articles', value: 'node--article'},
    {name: 'Memes', value: 'node--meme'}
  ];
  public selected = this.options[0].value;
  private videosDone = false;
  private tipsDone = false;
  private articlesDone = false;
  private memesDone = false;
  private tempAllTipsAndTools = [];
  ngOnInit() {
    const localTipsAndTools = JSON.parse(localStorage.getItem('tipsAndTools'));
    if (localTipsAndTools) {
      this.allTipsAndTools = localTipsAndTools;
      this.filterResult();
    }
    this.getVideos();
    this.getTips();
    this.getArticles();
    this.getMemes();
  }
  getVideos() {
    const _this = this;
    this.tipsAndToolsService.getVideos().then(response => {
      const videos = response.data.data;
      videos.forEach((video, index) => {
        _this.tempAllTipsAndTools.push(video);
        if (index === videos.length - 1) {
          _this.videosDone = true;
          _this.checkDone();
        }
      });
    });
  }
  getTips() {
    const _this = this;
    this.tipsAndToolsService.getTips().then(response => {
      const tips = response.data.data;
      tips.forEach((tip, index) => {
        _this.tempAllTipsAndTools.push(tip);
        if (index === tips.length - 1) {
          _this.tipsDone = true;
          _this.checkDone();        }
      });
    });
  }
  getArticles() {
    const _this = this;
    this.tipsAndToolsService.getArticles().then(response => {
      const articles = response.data.data;
      articles.forEach((article, index) => {
        _this.tempAllTipsAndTools.push(article);
        if (index === articles.length - 1) {
          _this.articlesDone = true;
          _this.checkDone();        }
      });
    });
  }
  getMemes() {
    const _this = this;
    this.tipsAndToolsService.getMemes().then(response => {
      const memes = response.data.data;
      memes.forEach((meme, index) => {
        _this.tempAllTipsAndTools.push(meme);
        if (index === memes.length - 1) {
          _this.memesDone = true;
          _this.checkDone();        }

      });
    });
  }
  filterResult() {
    if (this.selected !== 'all') {
      this.result = this.allTipsAndTools.filter(element => element.type === this.selected);
      this.result.sort((a, b) => b.attributes.created - a.attributes.created);
    } else {
      this.result = this.allTipsAndTools;
      this.result.sort((a, b) => b.attributes.created - a.attributes.created);
    }
  }
  checkDone() {
    if (this.videosDone && this.tipsDone && this.memesDone && this.articlesDone) {
      this.allTipsAndTools = this.tempAllTipsAndTools;
      this.filterResult();
      localStorage.setItem('tipsAndTools', JSON.stringify(this.allTipsAndTools));
    }
  }
  getThumbnailImage(video) {
    const fullVideoUrl = video.attributes.field_video_url.uri;
    if (fullVideoUrl.includes('youtube')) {
      const id = fullVideoUrl.split('?v=')[1];
      return `https://img.youtube.com/vi/${id}/0.jpg`;
    }
  }
}

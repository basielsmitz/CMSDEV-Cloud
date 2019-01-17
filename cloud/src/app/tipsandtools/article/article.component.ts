import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipsAndToolsService } from 'src/app/tips-and-tools.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  private articleId = this.route.snapshot.paramMap.get('id');
  public article = null;

  constructor(
    private route: ActivatedRoute,
    private tipsAndToolsService: TipsAndToolsService
    ) { }

  ngOnInit() {
    console.log(this.articleId);
    this.getArticle();
  }

  getArticle() {
    const _this = this;
    this.tipsAndToolsService.getArticleById(this.articleId).then(response => {
      console.log(response);
      const data = response.data.data;
      const included = response.data.included;
      console.log(data);
      const article = {
        body: data.attributes.body.value,
        id: data.id,
        title: data.attributes.title,
        imageUrl: `http://slaapapp.local${included.filter(incl => incl.id === data.relationships.field_image.data.id)[0].attributes.url}`,
      };
      _this.article = article;
    }).catch(error => {
      console.log(error);
    });
  }

}

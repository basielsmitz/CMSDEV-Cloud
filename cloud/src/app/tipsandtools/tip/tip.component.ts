import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipsAndToolsService } from 'src/app/tips-and-tools.service';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css']
})
export class TipComponent implements OnInit {

  private tipId = this.route.snapshot.paramMap.get('id');
  public tip = null;

  constructor(
    private route: ActivatedRoute,
    private tipsAndToolsService: TipsAndToolsService
    ) { }

  ngOnInit() {
    console.log(this.tipId);
    this.getTip();
  }

  getTip() {
    const _this = this;
    this.tipsAndToolsService.getTipById(this.tipId).then(response => {
      console.log(response);
      const data = response.data.data;
      const included = response.data.included;
      console.log(data);
      const tip = {
        body: data.attributes.body.value,
        id: data.id,
        title: data.attributes.title,
        links: data.attributes.field_ex
      };
      _this.tip = tip;
    }).catch(error => {
      console.log(error);
    });
  }

}

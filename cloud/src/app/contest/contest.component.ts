import { Component, OnInit } from '@angular/core';
import { ContestService } from './../contest.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {
  private schoolId = JSON.parse(localStorage.getItem('currentUser')).data.relationships.field_school.data.id;
  public entries = [];
  constructor(private contestService: ContestService) { }

  ngOnInit() {
    this.getPictures();
    const tempEntries = JSON.parse(localStorage.getItem('pictureEntries'));
    if (tempEntries) {
      this.entries = tempEntries;
    }
  }

  getPictures() {
    const tempEntries = [];
    const _this = this;
    this.contestService.getAllFromScool(this.schoolId).then(response => {
      console.log(response);
      const included = response.data.included;
      console.log('included');
      console.log(included);
      response.data.data.forEach((entry, index) => {
        console.log(entry);
        const pictureEntry = {
          imageUrl: `http://slaapapp.local${_this.getEntryFromIncluded(entry, included, 'field_image')[0].attributes.url}`,
          likes: entry.relationships.field_likes.data,
          contest: _this.getEntryFromIncluded(entry, included, 'field_contest')[0].attributes,
          user: _this.getEntryFromIncluded(entry, included, 'uid')[0].attributes,
          date: new Date(entry.attributes.created * 1000),
          data: entry,
        };
        console.log(pictureEntry);
        tempEntries.push(pictureEntry);
        if (index === response.data.data.length - 1) {
          _this.entries = tempEntries;
          localStorage.setItem('pictureEntries', JSON.stringify(tempEntries));
        }
      });
    }).catch(error => {
      console.log(error);
    });
  }
  getEntryFromIncluded(entry, included, key) {
    console.log(included);
    console.log(entry);
    console.log(key);
    console.log(included.filter(incl => incl.id === entry.relationships[key].data.id));
    return included.filter(incl => incl.id === entry.relationships[key].data.id);
  }

}

import { Component, OnInit } from '@angular/core';
import { SleepLogService } from './../sleep-log.service';
import { DateService } from '../date.service';
import { TaxonomyService } from '../taxonomy.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('currentUser'));
  public imageUrl = `http://slaapapp.local${this.user.image.attributes.url}`;
  public logs = null;
  public school = null;

  constructor(
    private sleepLogService: SleepLogService,
    private dateService: DateService,
    private taxonomyService: TaxonomyService,
    ) { }

  ngOnInit() {

    this.getLogs();
    const school = JSON.parse(localStorage.getItem('school'));
    if (school) { this.school = school; } else {
      this.getSchool();
    }
  }
  getLogs() {
    const _this = this;
    this.sleepLogService.getLatestUserLogs(this.user.data.attributes.uid)
      .then(response => {
        console.log(response.data.data);
        response.data.data.forEach(log => {
          console.log(log);
          const creationDate = new Date(log.attributes.created * 1000);
          console.log(creationDate.getDay());
          const logObj = {
            day: this.dateService.getDayName(creationDate.getDay())
          };
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  getSchool() {
    const _this = this;
    const tempSchools = [];
    this.taxonomyService.getSchools().then(response => {
      const school = response.data.data.filter(sch => sch.attributes.uuid === _this.user.data.relationships.field_school.data.id)[0];
      localStorage.setItem('school', JSON.stringify(
        {name: school.attributes.name, id: _this.user.data.relationships.field_school.data.id}));
      this.school = {name: school.attributes.name, id: _this.user.data.relationships.field_school.data.id};
    });
  }

}

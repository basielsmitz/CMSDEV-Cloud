import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { HttpService } from './../../http.service';
import { TaxonomyService } from 'src/app/taxonomy.service';
import { FriendService } from './../../friend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private userId = this.route.snapshot.paramMap.get('id');
  public user = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private httpService: HttpService,
    private friendService: FriendService,
    ) { }

  ngOnInit() {
    const _this = this;
    if (this.userId) {
      console.log(this.userId);
      this.friendService.getUserById(this.userId).then(response => {
        console.log(response);
        const data = response.data.data[0];
        const included = response.data.included;
        console.log(data);
        const user = {
          name: `${data.attributes.field_first_name} ${data.attributes.field_last_name}`,
          school: JSON.parse(localStorage.getItem('school')).name,
          adresStreet: `${data.attributes.field_location_street} ${data.attributes.field_location_number}`,
          adresPostal: data.attributes.field_location_postal,
          adresCity: data.attributes.field_location,
          type: included.filter(type => type.id === data.relationships.field_sleep_profile.data.id)[0].attributes.name,
          goal: data.attributes.field_goal_hours,
          images: [],
          // tslint:disable-next-line:max-line-length
          userImage: `http://slaapapp.local${included.filter(image => image.id === data.relationships.user_picture.data.id)[0].attributes.url}`,
        };
        _this.user = user;
        console.log(data.relationships);
      }).catch(error => {
        console.log(error);
      });

    }
  }
}

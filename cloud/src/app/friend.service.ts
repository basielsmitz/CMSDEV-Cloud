import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private baseUrl = 'http://slaapapp.local';
  private users = this.baseUrl + '/jsonapi/user/user';

  constructor(private httpService: HttpService) { }

  getUserById(id) {
    return this.httpService.instance.get(`${this.users}?filter[uuid]=${id}&include=user_picture,field_sleep_profile`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }
  getAllUsersFromSchool(id) {
    return this.httpService.instance.get(`${this.users}` +
    `?filter[field_school.uuid]=${id}`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }

  addFriend(user, student) {
    console.log(user);
    console.log(student);
    const currentFriends = user.relationships.field_friends.data;
    currentFriends.push({
      type: 'user--user',
      id: student.id,
    });
    console.log(currentFriends);
    return this.httpService.instance.patch(`${this.users}/${user.id}`, {
      data: {
        type: 'user--user',
        id: user.id,
        relationships: {
          field_friends: {
            data: currentFriends
          }
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      }
    });
  }
}

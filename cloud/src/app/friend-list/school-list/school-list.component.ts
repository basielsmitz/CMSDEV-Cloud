import { Component, OnInit } from '@angular/core';
import { FriendService } from './../../friend.service';
import { UserService } from './../../user.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  private schoolId = JSON.parse(localStorage.getItem('school')).id;
  private allStudents = JSON.parse(localStorage.getItem('allStudents'));
  private currentUser = JSON.parse(localStorage.getItem('currentUser'));
  public filteredStudents;
  public filterDone = false;
  constructor(
    private friendService: FriendService,
    private userService: UserService,
    ) { }

  ngOnInit() {
    if (this.allStudents) {
      console.log(true);
      this.filterStudents();
    }
    this.getAllStudents();
  }
  getAllStudents() {
    console.log(this.schoolId);
    const tempStudents = [];
    const _this = this;
    this.friendService.getAllUsersFromSchool(this.schoolId).then(response => {
      console.log(response);
      response.data.data.forEach((stu, index) => {
        tempStudents.push(stu);
        if (index === response.data.data.length - 1) {
          tempStudents.filter(student => student.id !== this.currentUser.data.id);
          console.log(this.currentUser.data.id);
          localStorage.setItem('allStudents', JSON.stringify(tempStudents));
          _this.allStudents = tempStudents;
          _this.filterStudents();
        }
      });
    }).catch(error => {
      console.log(error);
    });
  }
  filterStudents() {
    const filtered = Array.from(this.allStudents);
    this.currentUser.friends.forEach((friend, indexF) => {
      this.allStudents.forEach((student, indexS) => {
        if (friend.id === student.id) {
          filtered.splice(filtered.indexOf(student), 1);
        }
        if (indexF === 0 && this.currentUser.data.id === student.id) {
          filtered.splice(filtered.indexOf(student), 1);
        }
        if (indexF === this.currentUser.friends.length - 1 && indexS === this.allStudents.length - 1) {
          this.filteredStudents = filtered;
        }
      });
    });
  }
  addFriend(student) {
    const _this = this;
    this.filteredStudents.splice(this.filteredStudents.indexOf(student), 1);
    this.friendService.addFriend(this.currentUser.data, student).then(response => {
      console.log(response);
      _this.currentUser.friends.push(student);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      console.log(_this.currentUser.friends);
    }).catch(error => {
      this.filteredStudents.push(student);
    });
  }

}

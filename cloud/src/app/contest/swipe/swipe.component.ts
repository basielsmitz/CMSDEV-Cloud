import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/contest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent implements OnInit {

  private allEntries = JSON.parse(localStorage.getItem('pictureEntries'));
  private filteredEntries = [];
  private disliked = [];
  public currentEntry = null;
  private userId = JSON.parse(localStorage.getItem('currentUser')).data.id;

  constructor(
    private contestService: ContestService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.filterEntries();
  }

  filterEntries() {
    console.log(this.allEntries);
    const filter1 = this.allEntries.filter(entry => entry.user.uuid !== this.userId);
    console.log(filter1);
    const filter2 = filter1.filter(entry => entry.likes === this.hasLiked(entry.likes));
    this.filteredEntries = filter2;
    console.log(this.filteredEntries);
    this.currentEntry = this.filteredEntries[0];
    console.log(this.currentEntry);
  }

  hasLiked(likes) {
    const filtered = likes.filter(like => like.id === this.userId);
    if (filtered.length < 1) {
      return likes;
    }
    return  null;
  }
  next() {
    this.currentEntry = this.filteredEntries[this.filteredEntries.indexOf(this.currentEntry) + 1];
    if (!this.currentEntry) {
      this.router.navigate(['/contest']);
    }
  }

  like() {
    this.contestService.castLike(this.currentEntry.data, this.userId).then(response => {
      console.log(response);
    }).catch(error => console.log(error));
    console.log(this.currentEntry);
    this.next();
  }
}

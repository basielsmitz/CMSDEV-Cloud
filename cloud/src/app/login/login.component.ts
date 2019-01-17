import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authetnicationService: AuthenticationService) { }
  public data = {
    username: null,
    password: null,
  };

  ngOnInit() {
  }
  login() {
    this.authetnicationService.login(this.data);
  }

}

import { Component, OnInit } from '@angular/core';

import { AccountService } from './../Services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.checkIfUserIsLoggedIn();
  }
  signInWithGoogle(): void {
   this.accountService.signInWithGoogle();
  }
}

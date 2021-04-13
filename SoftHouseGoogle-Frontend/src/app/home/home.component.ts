import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../Models/User.model';
import { AccountService } from './../Services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.accountService.users.subscribe((users: User[]) => {
      this.users = users;
    })
  }

  signOut() {
    this.accountService.signOut();
  }

  getUsers() {
    this.accountService.getUsersAPI();
  }

  editUser(id: number) {
    this.router.navigate(['/edit', id]);
  }

  writeToDisk() {
    this.accountService.writeToDisk();
  }
}

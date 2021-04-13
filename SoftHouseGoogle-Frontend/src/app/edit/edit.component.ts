import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountService } from './../Services/account.service';
import { User } from './../Models/User.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
  }

  editUser() {
    let user: User = new User();

    this.activatedRoute.params.subscribe(params => {
      user.id = params['id'];
    });
    user.email = this.email;
    user.first_name = this.firstName;
    user.last_name = this.lastName

    this.accountService.editUser(user);
    this.router.navigate(['/home']);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { DataResponse } from './../Models/DataResponse';
import { User } from '../Models/User.model'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  loggedIn: boolean = false;
  public savedData: string = '';

  private observableUsers: BehaviorSubject<User[]> = <BehaviorSubject<User[]>>new BehaviorSubject([]);
  constructor(
    private authService: SocialAuthService, 
    private router: Router,
    private http: HttpClient
    ) 
    {
      this.authService.authState.subscribe((user) => {
        console.log(user);
        this.loggedIn = (user != null);
      });
    }


  get users() {
    return this.observableUsers.asObservable();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(() => {
      this.loggedIn = true;
      this.router.navigate(['/home']);
    }).catch((res) => {
      console.log(res);
      this.router.navigate(['/home']);
    })
  }

  checkIfUserIsLoggedIn() 
  {
    if(this.loggedIn) {
      return true;
    }
    return false
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.loggedIn = false;
      this.router.navigate(['/login']);
    })
  }

  editUser(edittedUser: User) {
    console.log('rad');
    this.observableUsers.subscribe(users => {
      const index = edittedUser.id - 1;
      users[index] = edittedUser;
    }).unsubscribe();

  }

  getUsersAPI() {
    return this.http.get<DataResponse>("https://reqres.in/api/users").subscribe(
      data => {
        this.observableUsers.next(data.data);
        console.log(this.observableUsers.value);
      }
    )
  }

  writeToDisk() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post("https://localhost:44361/User", JSON.stringify(this.observableUsers.value), httpOptions)
    .subscribe(() => {});
  }
}

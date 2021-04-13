import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AccountService } from './Services/account.service';

@Injectable({ providedIn: 'root' })
export class HomeGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate() {
        const loggedIn = this.accountService.checkIfUserIsLoggedIn();
        if (loggedIn) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private usersService: UsersService , private router: Router) {}
    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): boolean | Observable<boolean> | Promise<boolean> {
            const isAuth = this.usersService.getAuth();
            if ( ! isAuth) {
                this.router.navigate(['/login']);
            }
        return isAuth;
    }
}

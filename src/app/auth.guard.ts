import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "./shared/auth.service";
import {Observable} from "rxjs";


@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log(this.authService.getUser());

    if (this.authService.getUser().authLvl == 1)
      return true;

    this.router.navigate(['/']);
    return false;
  }
}

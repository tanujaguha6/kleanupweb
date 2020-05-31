import { Injectable } from '@angular/core';
import {CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LoginService} from './login.service';
import {ActivatedRoute} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];
    //console.log(this.loginService.isLoggedIn())
    
    if (this.loginService.isLoggedIn()) {
      if(redirectUrl == "/login")
        this.router.navigate(['/user'])
      return true;
    }
    if(redirectUrl != "/login")
      this.router.navigate(['login']);
    return true;
  }

}

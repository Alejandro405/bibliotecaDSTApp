import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginUserService } from './services/login-user.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogGuardGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private cookieService: CookieService) { };
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.cookieService.check('SessionStatus') && this.cookieService.get('SessionStatus') === 'Logged') {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("SessionStatus") == "Logged") {
      this.router.navigateByUrl("catalog");
    } else {
      alert("El contenido del catálogo solo es accesible para usuarios registrados en la web");
      this.router.navigateByUrl("login");
    }
    return true;
  }
}

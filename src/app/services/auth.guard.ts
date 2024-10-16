import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isTemplateRoute = state.url.startsWith('/template');
    if (isTemplateRoute) {
      return true;
    }
    if (typeof window !== 'undefined' && localStorage) {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}

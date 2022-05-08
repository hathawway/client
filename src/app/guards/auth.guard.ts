import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of, map } from "rxjs";
import { AuthService } from "../services/auth.service";
import {Role} from "./roles";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(private auth: AuthService,
        private router: Router) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
        return this.canActivate(childRoute, state)
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.auth.isAuthenticated()) {
            return this.checkUserLogin(route, state.url)
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true
                }
            })
            return of(false)
        }
    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): Observable<boolean> {
      return this.auth.getCurrentUserRoles().pipe(map((roles: Array<number>) => {
        if (route.data['roles']) {
          for (const rolesKey in roles) {
            for (const roleFromCom in route.data['roles'])
            if (route.data['roles'][roleFromCom] == roles[rolesKey]) {
              return true
            }
          }

          this.router.navigate(['/dashboard']); // TODO мб доработать
          return false
        } else {
          return true
        }
      }))

    }
}

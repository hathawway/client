import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(private autn:AuthService,
        private router: Router) {
        
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(childRoute, state)
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
        if (this.autn.isAuthenticated()) {
            return of(true)
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true
                }
            })
            return of(false)
        }
    }

}
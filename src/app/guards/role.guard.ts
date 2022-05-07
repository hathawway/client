import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable()

export class RoleGuard implements CanActivateChild {

  constructor(private router: Router, private autn:AuthService) {}
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        throw new Error('Method not implemented.');
    }
   
    /*canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
            return this.canActivate(childRoute, state)
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {

        //const userRoles: string = this.auth.getUser();  // <--------- get the current user's roles получить роли текущего пользователя
    //const routeRoles: string[] = route.data['roles'];   // <------- Will get the roles arry you defined in your router config Получат роли, которые вы определили в конфигурации маршрутизатора.

        /*if (this.autn.getUser() === ) {
            return of(true)
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true
                }
            })
            return of(false)
        }

    /*if (this. === roles) {
        return true;
    } else {
        this.router.navigate([redirectionUrl]);
    }/

    /*
      Now you can do your logic to determine if the user has the appropriate role.
      If they do return true
      Else use router to set a redirect route to /user url or whereever you feel like and return false;

      Теперь вы можете выполнить свою логику, чтобы определить, есть ли у пользователя соответствующая роль.
      Если они возвращают true
      В противном случае используйте маршрутизатор, чтобы установить маршрут перенаправления на /user url или куда угодно, и верните false;
    
      
  }*/
}
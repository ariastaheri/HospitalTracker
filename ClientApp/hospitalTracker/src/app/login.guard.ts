import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./modules/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(private _auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this._auth.loggedIn()) {
      this.router.navigate(["/user/dashboard"]);
      return false;
    } else {
      return true;
    }
  }
}

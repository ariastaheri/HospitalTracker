import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/modules/auth/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  username = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);

  userData = {
    userId: "",
    password: "",
  };

  constructor(
    private _auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  getErrorMessage() {
    if (this.username.hasError("required")) {
      return "You must enter a value for username";
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError("required")) {
      return "Email is required!";
    }

    return this.email.hasError("email") ? "Not a valid email" : "";
  }

  loginUser() {
    if (this.userData.userId === "" || this.userData.password === "") return;
    this._auth.loginUser(this.userData).subscribe((res) => {
      if (res.success) {
        this.toastr.success("", "Login Successful!", { timeOut: 2000 });
        localStorage.removeItem("token");
        localStorage.setItem("token", res.token);
        localStorage.removeItem("currentUser");
        localStorage.setItem("currentUser", res.currentUser);
        this.router.navigate(["/user/dashboard"]);
      } else {
        this.toastr.error(res.message, "Login Failed!", { timeOut: 2000 });
      }
    });
  }
}

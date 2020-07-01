import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/modules/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent implements OnInit {
  username = new FormControl("", [Validators.required]);
  fullname = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
  ]);

  userToRegister = {
    userId: "",
    name: "",
    email: "",
    password: "",
    role: "",
    status: "active",
  };

  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit() {}
  getErrorMessage() {
    if (this.username.hasError("required")) {
      return "You must enter a value for username";
    }
  }
  getNameErrorMessage() {
    if (this.fullname.hasError("required")) {
      return "You must enter a value for your Full Name";
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError("required")) {
      return "Email is required!";
    }

    return this.email.hasError("email") ? "Not a valid email" : "";
  }

  getPasswordErrorMessage() {
    if (this.password.hasError("required")) {
      return "Password is required!";
    }
    if (this.password.hasError("minlength")) {
      return "Password needs to be at least 6 characters!";
    }
    if (this.password.hasError("maxlength")) {
      return "Password needs to be at most 20 characters!";
    } else return "";
  }

  validateForm() {
    return (
      this.userToRegister.name === "" ||
      this.userToRegister.userId === "" ||
      this.userToRegister.password === "" ||
      this.userToRegister.email === "" ||
      this.userToRegister.role === ""
    );
  }

  registerUser() {
    this._auth.registerUser(this.userToRegister).subscribe(
      (res) => this.router.navigateByUrl("/auth/login"),
      (err) => console.log(err)
    );
  }
}

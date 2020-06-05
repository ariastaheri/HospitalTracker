import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent implements OnInit {
  username = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);

  constructor() {}

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
}

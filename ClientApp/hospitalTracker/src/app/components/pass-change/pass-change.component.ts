import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/modules/auth/auth.service";

@Component({
  selector: "app-pass-change",
  templateUrl: "./pass-change.component.html",
  styleUrls: ["./pass-change.component.scss"],
})
export class PassChangeComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private _auth: AuthService
  ) {}

  currentUser = {
    _id: "",
  };

  passwords = {
    newPass: "",
    confirmPass: "",
  };

  passMatch = false;
  passValid = false;

  ngOnInit() {
    this.currentUser._id = this.route.snapshot.params["id"];
  }

  back() {
    if (localStorage.getItem("currentUser"))
      this.router.navigate(["/user/profile/" + this.currentUser._id]);
    else {
      this.router.navigate(["/auth/login/"]);
    }
  }

  checkPasses() {
    console.log(this.passwords);
    if (this.passwords.newPass.length >= 6) {
      this.passValid = true;
    } else {
      this.passValid = false;
    }

    if (this.passwords.newPass === this.passwords.confirmPass) {
      this.passMatch = true;
    } else {
      this.passMatch = false;
    }
  }

  changePassword() {
    this.checkPasses();
    if (this.passMatch && this.passValid) {
      let newPassword = {
        password: this.passwords.newPass,
      };
      this._auth
        .changePassword(newPassword, this.currentUser._id)
        .subscribe((res) => {
          this.toastr.success("Password updated successfully!", "", {
            timeOut: 1500,
          });
          this.router.navigate(["/user/profile/" + this.currentUser._id]);
        });
    } else {
      this.passMatch
        ? this.toastr.warning("Please enter a valid password", "", {
            timeOut: 1500,
          })
        : this.toastr.warning("Entered passwords do not match!", "", {
            timeOut: 1500,
          });
    }
  }
}

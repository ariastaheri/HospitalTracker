import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/modules/auth/auth.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit {
  currentUser = {
    _id: "",
    name: "",
    roles: [],
    email: "",
  };

  editMode: boolean = false;

  userDetail = {
    name: "",
    email: "",
  };

  constructor(
    private _auth: AuthService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.currentUser._id = this.activeRoute.snapshot.params["id"];
    this._auth.getUserDetails(this.currentUser._id).subscribe((user) => {
      this.currentUser.name = user.name;
      this.currentUser.email = user.email;
      this.currentUser.roles = user.roles;
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.userDetail.name = this.currentUser.name;
    this.userDetail.email = this.currentUser.email;
    this.editMode = !this.editMode;
    this._auth
      .saveUserDetailChanges(this.currentUser._id, this.userDetail)
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success("", "Update Successful!");
        },
        (err) => {
          console.log(err);
          this.toastr.error("", "Update failed!");
        }
      );
  }
}

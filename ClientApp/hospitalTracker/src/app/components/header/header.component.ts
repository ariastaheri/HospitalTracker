import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NewPatientComponent } from "../new-patient/new-patient.component";
import { AuthService } from "src/app/modules/auth/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private _auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  currentUser = {
    _id: "",
    name: "",
    roles: [],
    email: "",
  };

  ngOnInit() {
    this.currentUser._id = localStorage.getItem("currentUser");
    this._auth.getUserDetails(this.currentUser._id).subscribe((user) => {
      this.currentUser.name = user.name;
      this.currentUser.email = user.email;
      this.currentUser.roles = user.roles;
      console.log(this.currentUser);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewPatientComponent, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  signout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    this.router.navigate(["/auth/login"]);
    this.toastr.info("", "You have been logged out!");
  }
}

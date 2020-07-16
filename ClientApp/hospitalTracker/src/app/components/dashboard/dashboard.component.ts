import { Component, OnInit } from "@angular/core";
import { Patient } from ".";
import { AuthService } from "src/app/modules/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  patients: Patient[];

  filteredPatients: Patient[];

  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit() {
    this._auth.getAllPatients().subscribe(
      (res) => {
        this.patients = this.filteredPatients = res;
      },
      (err) => {
        if (
          !err.error.authorized &&
          err.error.message == "Unauthorized request"
        ) {
          this._auth.logout();
          this.router.navigate(["/auth/login"]);
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log(filterValue);
    this.filteredPatients = this.patients.filter((patient) => {
      return patient.name.toLowerCase().indexOf(filterValue) > -1;
    });
  }
}

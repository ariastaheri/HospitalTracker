import { Component, OnInit } from "@angular/core";
import { Patient } from ".";
import { AuthService } from "src/app/modules/auth/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  patients: Patient[];

  filteredPatients: Patient[];

  constructor(private _auth: AuthService) {}

  ngOnInit() {
    this._auth.getAllPatients().subscribe((res) => {
      console.log(res);
      this.patients = this.filteredPatients = res;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log(filterValue);
    this.filteredPatients = this.patients.filter((patient) => {
      return patient.name.toLowerCase().indexOf(filterValue) > -1;
    });
  }
}

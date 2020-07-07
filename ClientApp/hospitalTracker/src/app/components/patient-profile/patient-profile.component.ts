import { Component, OnInit } from "@angular/core";
import { Visit, Patient } from "../dashboard";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/modules/auth/auth.service";

@Component({
  selector: "app-patient-profile",
  templateUrl: "./patient-profile.component.html",
  styleUrls: ["./patient-profile.component.scss"],
})
export class PatientProfileComponent implements OnInit {
  allVisits: Visit[];

  userid: string;

  profilePatient: Patient;

  patients: Patient[];

  constructor(private route: ActivatedRoute, private _auth: AuthService) {}

  ngOnInit() {
    this.userid = this.route.snapshot.params["id"];

    this._auth.getAllPatients().subscribe((res) => {
      this.patients = res;
      this.profilePatient = this.patients.find((element) => {
        return element._id === this.userid;
      });
      console.log(this.profilePatient);
    });
  }
}

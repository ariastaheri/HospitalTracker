import { Component, OnInit, Inject } from "@angular/core";
import { AuthService } from "src/app/modules/auth/auth.service";

@Component({
  selector: "app-new-patient",
  templateUrl: "./new-patient.component.html",
  styleUrls: ["./new-patient.component.scss"],
})
export class NewPatientComponent implements OnInit {
  validForm: boolean = false;

  patientInfo = {
    genderPicked: "",
    fullName: "",
    DOB: "",
    history: "",
  };
  genders: string[] = ["Male", "Female"];
  constructor(private _auth: AuthService) {}

  ngOnInit() {}

  validateForm() {
    return (
      this.patientInfo.genderPicked !== "" &&
      this.patientInfo.fullName !== "" &&
      this.patientInfo.DOB !== ""
    );
  }

  savePatientInfo() {
    this.patientInfo.DOB = this.patientInfo.DOB.toString();
    console.log(this.patientInfo);
    this._auth.saveNewPatient(this.patientInfo).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}

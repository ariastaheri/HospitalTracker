import { Component, OnInit } from "@angular/core";
import { Visit, Patient } from "../dashboard";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/modules/auth/auth.service";
import { MatDialog } from "@angular/material";
import { EditVisitComponent } from "../edit-visit/edit-visit.component";

@Component({
  selector: "app-patient-profile",
  templateUrl: "./patient-profile.component.html",
  styleUrls: ["./patient-profile.component.scss"],
})
export class PatientProfileComponent implements OnInit {
  allVisits: Visit[];

  userid: string;

  profilePatient: Patient = {
    _id: "",
    name: "",
    gender: "",
    visits: [],
    dateOfBirth: "",
    history: "",
  };

  patients: Patient[];

  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userid = this.route.snapshot.params["id"];

    this._auth.getPatient(this.userid).subscribe((res) => {
      this.profilePatient = res;

      this.profilePatient.dateOfBirth = this.profilePatient.dateOfBirth.slice(
        0,
        10
      );
    });
  }

  deleteVisit(id, patientid) {
    this._auth.deleteVisit(id, patientid).subscribe((res) => {
      this.ngOnInit();
    });
  }

  checkEdit() {
    return this.editMode;
  }

  editVisit(visit) {
    let dialogRef = this.dialog.open(EditVisitComponent, {
      width: "400px",
      data: {
        id: visit._id,
        date: visit.dateOfVisit,
        diagnosis: visit.diagnosis,
        tests: visit.tests,
        prescription: visit.prescription,
        symptoms: visit.symptoms,
      },
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  savePatientUpdate() {
    let newUpdate = {
      dateOfBirth: this.profilePatient.dateOfBirth.slice(0, 10),
      name: this.profilePatient.name,
      history: this.profilePatient.history,
    };

    let patientId = this.profilePatient._id;

    this._auth.updatePatient(newUpdate, patientId).subscribe((res) => {
      console.log(res);
    });

    this.toggleEdit();

    window.location.reload();
  }
}

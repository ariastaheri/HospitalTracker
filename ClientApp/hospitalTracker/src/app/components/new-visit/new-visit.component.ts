import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Patient, Visit } from "../dashboard";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatOption } from "@angular/material";
import { AuthService } from "src/app/modules/auth/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-new-visit",
  templateUrl: "./new-visit.component.html",
  styleUrls: ["./new-visit.component.scss"],
})
export class NewVisitComponent implements OnInit {
  patients: Patient[];

  filteredPatients: Observable<Patient[]>;
  patientControl = new FormControl();

  visitToBeAdded = {
    dateOfVisit: undefined,
    diagnosis: "",
    tests: "",
    prescription: "",
    symptoms: "",
  };

  patientVisiting: string;

  constructor(
    private route: ActivatedRoute,
    private _auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this._auth.getAllPatients().subscribe((res) => {
      this.patients = res;

      this.filteredPatients = this.patientControl.valueChanges.pipe(
        startWith(""),
        map((state) => (state ? this._applyFilter(state) : this.patients))
      );
    });
  }

  private _applyFilter(value: string): Patient[] {
    if (typeof value !== "string") {
      return;
    }
    const filterValue = value.toLowerCase();
    return this.patients.filter((patient) => {
      return patient.name.toLowerCase().indexOf(filterValue) > -1;
    });
  }

  onPatientSelected(option: MatOption) {
    console.log(option);
    this.patientVisiting = option.value._id;
  }

  resetAll() {
    this.visitToBeAdded = {
      dateOfVisit: undefined,
      diagnosis: "",
      tests: "",
      prescription: "",
      symptoms: "",
    };
  }

  valueMapper(key) {
    return key ? key.name : undefined;
  }

  saveVisit() {
    this._auth
      .saveNewVisit(this.patientVisiting, this.visitToBeAdded)
      .subscribe(
        (res) => {
          this.toastr.success("", "Visit added successfully!");

          this.resetAll();
        },
        (err) => {
          this.toastr.error("Process failed", "Something went wrong!");
        }
      );
  }
}

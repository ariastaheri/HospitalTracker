import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Patient } from "../dashboard";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatOption } from "@angular/material";

@Component({
  selector: "app-new-visit",
  templateUrl: "./new-visit.component.html",
  styleUrls: ["./new-visit.component.scss"],
})
export class NewVisitComponent implements OnInit {
  patients: Patient[] = [
    {
      _id: "1",
      name: "Aria Taheri",
      gender: "male",
      visits: [],
      DOB: new Date(1991, 8, 17),
      history: "no history for this patient",
    },
    {
      _id: "2",
      name: "Amin Taheri",
      visits: [],
      gender: "male",
      DOB: new Date(1997, 4, 24),
      history: "History of mental illness",
    },
    {
      _id: "3",
      name: "Samir Sharif1",
      visits: [],
      gender: "male",
      DOB: new Date(1997, 4, 24),
      history: "History of mental illness",
    },
    {
      _id: "4",
      name: "Anahid Mo2",
      gender: "male",
      visits: [],
      DOB: new Date(1997, 4, 24),
      history: "History of mental illness",
    },
    {
      _id: "5",
      name: "Maryam Sharif",
      gender: "male",
      visits: [],
      DOB: new Date(1991, 8, 17),
      history: "no history for this patient",
    },
    {
      _id: "6",
      name: "Amir Sheikhtaheri",
      gender: "male",
      visits: [],
      DOB: new Date(1997, 4, 24),
      history: "History of mental illness",
    },
    {
      _id: "7",
      name: "Ghazale G",
      gender: "female",
      visits: [],
      DOB: new Date(1991, 5, 4),
      history: "No History",
    },
  ];

  filteredPatients: Observable<Patient[]>;
  patientControl = new FormControl();

  constructor(private route: ActivatedRoute) {
    this.filteredPatients = this.patientControl.valueChanges.pipe(
      startWith(""),
      map((state) => (state ? this._applyFilter(state) : this.patients.slice()))
    );
  }

  ngOnInit() {
    console.log(this.route.snapshot.params["id"]);
  }

  private _applyFilter(value: Patient): Patient[] {
    const filterValue = value["name"].toLowerCase();
    return this.patients.filter((patient) => {
      patient.name.toLowerCase().indexOf(filterValue) > -1;
    });
  }

  onPatientSelected(option: MatOption) {
    console.log(option.value);
  }

  patientDisplay(patient: Object) {
    return patient ? patient["name"] : undefined;
  }
}

import { Component, OnInit } from "@angular/core";
import { Patient } from ".";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  patients: Array<Patient>;

  ngOnInit() {
    this.patients = [
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
        name: "Amin Taheri1",
        visits: [],
        gender: "male",
        DOB: new Date(1997, 4, 24),
        history: "History of mental illness",
      },
      {
        _id: "4",
        name: "Amin Taheri2",
        gender: "male",
        visits: [],
        DOB: new Date(1997, 4, 24),
        history: "History of mental illness",
      },
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
        gender: "male",
        visits: [],
        DOB: new Date(1997, 4, 24),
        history: "History of mental illness",
      },
      {
        _id: "5",
        name: "Ghazale G",
        gender: "female",
        visits: [],
        DOB: new Date(1991, 5, 4),
        history: "No History",
      },
    ];
  }
}

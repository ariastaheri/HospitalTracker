import { Component, OnInit } from "@angular/core";
import { Patient } from ".";
import { MatTableDataSource } from "@angular/material/table";
import { CloseScrollStrategy } from "@angular/cdk/overlay";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor() {}

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

  filteredPatients: Patient[];

  ngOnInit() {
    this.filteredPatients = this.patients;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log(filterValue);
    this.filteredPatients = this.patients.filter((patient) => {
      return patient.name.toLowerCase().indexOf(filterValue) > -1;
    });
  }
}

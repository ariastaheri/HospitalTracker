import { Component, OnInit } from "@angular/core";
import { Visit, Patient } from "../dashboard";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-patient-profile",
  templateUrl: "./patient-profile.component.html",
  styleUrls: ["./patient-profile.component.scss"],
})
export class PatientProfileComponent implements OnInit {
  allVisits: Visit[];

  userid: string;

  profilePatient: Patient;

  visit1: Visit = {
    _id: "1",
    date: new Date(1991, 8, 9),
    diagnosis: "Herpes",
    meds: "Penicillin 1 a day for a week, Antibiotic once every 6 hours",
    tests: "Blood culture, CBC, CMP, Urinalysis, ECG",
    symptoms: "rash, fever, nausea",
  };
  patients: Patient[] = [
    {
      _id: "1",
      name: "Aria Taheri",
      gender: "male",
      visits: [this.visit1, this.visit1, this.visit1, this.visit1, this.visit1],
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
      _id: "5",
      name: "Aria Taheri",
      gender: "male",
      visits: [],
      DOB: new Date(1991, 8, 17),
      history: "no history for this patient",
    },
    {
      _id: "6",
      name: "Amin Taheri",
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

  constructor(private route: ActivatedRoute) {
    route.url.subscribe(() => {
      this.userid = route.snapshot.params.id;
    });
  }

  ngOnInit() {
    this.profilePatient = this.patients.find((element) => {
      return element._id === this.userid;
    });

    console.log(this.profilePatient.name);
  }
}

import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-new-patient",
  templateUrl: "./new-patient.component.html",
  styleUrls: ["./new-patient.component.scss"],
})
export class NewPatientComponent implements OnInit {
  genderPicked: string;
  genders: string[] = ["Male", "Female"];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}

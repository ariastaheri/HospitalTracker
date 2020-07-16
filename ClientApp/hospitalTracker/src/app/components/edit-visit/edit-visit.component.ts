import { Component, OnInit, Inject } from "@angular/core";
import { AuthService } from "src/app/modules/auth/auth.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-visit",
  templateUrl: "./edit-visit.component.html",
  styleUrls: ["./edit-visit.component.scss"],
})
export class EditVisitComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private dialogRef: MatDialogRef<EditVisitComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private router: Router,
    private toastr: ToastrService
  ) {}

  validForm: boolean = false;

  visitInfo = {
    id: this.data.id,
    dateOfVisit: this.data.date,
    diagnosis: this.data.diagnosis,
    tests: this.data.tests,
    prescription: this.data.prescription,
    symptoms: this.data.symptoms,
  };

  ngOnInit() {}

  saveVisitInfo() {
    this.visitInfo.dateOfVisit = this.visitInfo.dateOfVisit.toString();
    console.log(this.visitInfo);
    this._auth.editVisit(this.visitInfo).subscribe(
      (res) => {
        this.toastr.success("", "Visit updated!");
        window.location.reload();
      },
      (err) => {
        if (
          !err.error.authorized &&
          err.error.message == "Unauthorized request"
        ) {
          this._auth.logout();
          this.router.navigate(["/auth/login"]);
        } else {
          this.toastr.error("Process failed!", "Error in update!");
        }
      }
    );
  }
}

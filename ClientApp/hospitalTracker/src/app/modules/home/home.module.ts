import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ProfilePageComponent } from "src/app/components/profile-page/profile-page.component";
import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";
import { PatientProfileComponent } from "src/app/components/patient-profile/patient-profile.component";
import { NewPatientComponent } from "src/app/components/new-patient/new-patient.component";
import { NewVisitComponent } from "src/app/components/new-visit/new-visit.component";

const routes: Routes = [
  { path: "profile", component: ProfilePageComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "patient-profile", component: PatientProfileComponent },
  { path: "add-patient", component: NewPatientComponent },
  { path: "add-visit", component: NewVisitComponent },
];

@NgModule({
  declarations: [
    ProfilePageComponent,
    DashboardComponent,
    PatientProfileComponent,
    NewPatientComponent,
    NewVisitComponent,
  ],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [
    ProfilePageComponent,
    DashboardComponent,
    PatientProfileComponent,
    NewPatientComponent,
    NewVisitComponent,
  ],
})
export class HomeModule {}

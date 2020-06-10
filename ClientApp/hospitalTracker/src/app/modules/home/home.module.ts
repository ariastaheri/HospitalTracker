import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ProfilePageComponent } from "src/app/components/profile-page/profile-page.component";
import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";
import { PatientProfileComponent } from "src/app/components/patient-profile/patient-profile.component";
import { NewPatientComponent } from "src/app/components/new-patient/new-patient.component";
import { NewVisitComponent } from "src/app/components/new-visit/new-visit.component";
import { HeaderComponent } from "src/app/components/header/header.component";
import { FooterComponent } from "src/app/components/footer/footer.component";
import { HomeComponent } from "./home.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
} from "@angular/material";

@NgModule({
  declarations: [
    ProfilePageComponent,
    DashboardComponent,
    PatientProfileComponent,
    NewPatientComponent,
    NewVisitComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  exports: [
    ProfilePageComponent,
    DashboardComponent,
    PatientProfileComponent,
    NewPatientComponent,
    NewVisitComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RouterModule,
  ],
  bootstrap: [HomeComponent],
})
export class HomeModule {}

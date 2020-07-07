import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ProfilePageComponent } from "src/app/components/profile-page/profile-page.component";
import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";
import { PatientProfileComponent } from "src/app/components/patient-profile/patient-profile.component";
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
  MatDialogModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatAutocompleteModule,
} from "@angular/material";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ProfilePageComponent,
    DashboardComponent,
    PatientProfileComponent,
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
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProfilePageComponent,
    DashboardComponent,
    PatientProfileComponent,
    NewVisitComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RouterModule,
  ],
  bootstrap: [HomeComponent],
})
export class HomeModule {}

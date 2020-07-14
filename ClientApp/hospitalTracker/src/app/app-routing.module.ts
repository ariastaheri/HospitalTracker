import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./modules/auth/auth.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { HomeComponent } from "./modules/home/home.component";
import { ProfilePageComponent } from "./components/profile-page/profile-page.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NewVisitComponent } from "./components/new-visit/new-visit.component";
import { PatientProfileComponent } from "./components/patient-profile/patient-profile.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PassChangeComponent } from "./components/pass-change/pass-change.component";
import { AuthGuard } from "./auth.guard";
import { LoginGuard } from "./login.guard";

const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: "login", // child route path
        component: LoginPageComponent, // child route component that the router renders
        canActivate: [LoginGuard],
      },
      {
        path: "register",
        component: RegisterPageComponent, // another child route component that the router renders
        canActivate: [LoginGuard],
      },
    ],
  },
  {
    path: "user",
    component: HomeComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: "profile/:id", // child route path
        component: ProfilePageComponent, // child route component that the router renders
        canActivate: [AuthGuard],
      },
      {
        path: "dashboard",
        component: DashboardComponent, // another child route component that the router renders
        canActivate: [AuthGuard],
      },
      {
        path: "new-visit",
        component: NewVisitComponent, // another child route component that the router renders
        canActivate: [AuthGuard],
      },
      {
        path: "patient/:id",
        component: PatientProfileComponent, // another child route component that the router renders
        canActivate: [AuthGuard],
      },
      {
        path: "password/:id",
        component: PassChangeComponent, // another child route component that the router renders
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: "", redirectTo: "/auth/login", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

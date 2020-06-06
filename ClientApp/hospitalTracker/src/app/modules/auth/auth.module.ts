import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterPageComponent } from "src/app/components/register-page/register-page.component";
import { LoginPageComponent } from "src/app/components/login-page/login-page.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
];

@NgModule({
  declarations: [RegisterPageComponent, LoginPageComponent, AuthComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RegisterPageComponent, LoginPageComponent, AuthComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
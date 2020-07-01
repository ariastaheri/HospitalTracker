import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _apiUrl = "http://localhost:5000/api";
  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this._apiUrl + "/user", user);
  }
}

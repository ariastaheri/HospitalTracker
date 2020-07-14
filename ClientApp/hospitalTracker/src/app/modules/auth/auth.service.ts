import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _apiUrl = "http://localhost:5000/api";
  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this._apiUrl + "/user/register", user);
  }

  loginUser(user) {
    return this.http.post<any>(this._apiUrl + "/user/login", user);
  }

  getUserDetails(id) {
    return this.http.get<any>(this._apiUrl + "/user/" + id);
  }

  saveUserDetailChanges(id, newData) {
    return this.http.patch<any>(this._apiUrl + "/user/" + id, newData);
  }

  saveNewPatient(patient) {
    return this.http.post<any>(this._apiUrl + "/patient", patient);
  }

  updatePatient(patient, id) {
    return this.http.patch<any>(this._apiUrl + "/patient/" + id, patient);
  }

  getAllPatients() {
    return this.http.get<any>(this._apiUrl + "/patient");
  }

  getPatient(id) {
    return this.http.get<any>(this._apiUrl + "/patient/" + id);
  }

  saveNewVisit(patientId, visit) {
    return this.http.post<any>(this._apiUrl + "/visit/" + patientId, visit);
  }

  deleteVisit(id, patientid) {
    let fullId = id + "|" + patientid;
    return this.http.delete<any>(this._apiUrl + "/visit/" + fullId);
  }

  editVisit(visit) {
    return this.http.put<any>(this._apiUrl + "/visit/" + visit.id, visit);
  }

  changePassword(password, id) {
    return this.http.patch<any>(this._apiUrl + "/user/" + id, password);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }
}

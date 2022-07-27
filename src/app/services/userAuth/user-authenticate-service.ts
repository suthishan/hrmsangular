import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable, BehaviorSubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class UserAuthenticateService {
  // Api Methods for All modules
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  apiurl: any;
  // Headers Setup
  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  httpOptions = {
    headers: this.headers,
  };

  constructor(
    private http: HttpClient,
    @Inject("environment") public environment
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Handling Errors
  private handleError(error: any) {
    return throwError(error);
  }
  

  // Get Method Api
  userLogin(data): Observable<any> {
    console.log(data);
    
    this.apiurl = this.environment.apiUrl + `Login/index11`;
    return this.http
      .post<any>(this.apiurl, data,this.httpOptions)
      .pipe(tap(), catchError(this.handleError));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public getProfileDetails() {
    this.apiurl = this.environment.apiUrl + `Employee/overall_profile`;
    console.log(this.apiurl);
    return this.http.post(this.apiurl,{user_id:this.currentUserValue.uId})
  }
}

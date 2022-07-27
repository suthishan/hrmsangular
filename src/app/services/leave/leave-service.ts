import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LeaveService {
  // Api Methods for All modules
  public apiurl;

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
  ) {}

  // Handling Errors
  private handleError(error: any) {
    return throwError(error);
  }

  getDefaultApi(url): Observable<any> {
    const apiurl = this.environment.apiUrl + `Leavepage/leave_request1`;
    console.log(apiurl);
    return this.http.post(apiurl,{uId:this.getUid()}).pipe(tap(), catchError(this.handleError));
  }

  addLeave(url, data): Observable<any> {
    const apiurl = this.environment.apiUrl + url;
    return this.http
      .post(apiurl, data)
      .pipe(tap(), catchError(this.handleError));
  }

  getUid() {
    let data:any =  JSON.parse(localStorage.getItem('currentUser'));
    console.log(data);
    return data ? data.uId : '';
  }
}
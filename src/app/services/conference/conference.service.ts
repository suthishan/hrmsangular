import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
 

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  apiurl: any;

  headers = new HttpHeaders()
  .set("Content-Type", "application/json")
  .set("Accept", "application/json");
httpOptions = {
  headers: this.headers,
};

 
  isTblLoading: boolean;
  dataChange: any;

 
    
  constructor(private httpClient: HttpClient,
    @Inject("environment") public environment) {
    {
      this.currentUserSubject = new BehaviorSubject<any>(
        JSON.parse(localStorage.getItem("currentUser"))
      );
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }
  
    private handleError(error: any) {
      return throwError(error);
    }

success(){

}

   get(): Observable<any[]> {
    // this.apiurl = `api/${type}`;
    this.apiurl = this.environment.apiUrl11 + `conference/listview`;
    console.log(this.apiurl);
    return this.httpClient
      .get<any[]>(this.apiurl)
      .pipe(tap(), catchError(this.handleError));
  }

  list(user: any): Observable<any> {
    // this.apiurl = `api/${type}`;
    this.apiurl = this.environment.apiUrl + `ConferenceBook/bookConferencelist`;
    return this.httpClient
      .post<any>(this.apiurl, user, this.httpOptions)
      .pipe(tap(), catchError(this.handleError));
  }

  checkDateDB(data: any): Observable<any> {
    // this.apiurl = `api/${type}`;
    console.log(data);
    this.apiurl = this.environment.apiUrl11 + `conference/checkDate`;
    return this.httpClient
      .post<any>(this.apiurl, data, this.httpOptions)
      .pipe(tap(), catchError(this.handleError));
  }
   add(data: any): Observable<any> {
    // this.apiurl = `api/${type}`;
    console.log(data);
    this.apiurl = this.environment.apiUrl11 + `conference/listadd`;
    return this.httpClient
      .post<any>(this.apiurl, data, this.httpOptions)
      .pipe(tap(), catchError(this.handleError));
  }
}
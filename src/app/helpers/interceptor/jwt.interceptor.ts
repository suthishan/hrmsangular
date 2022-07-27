import { Injectable } from "@angular/core";
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserAuthenticateService } from "src/app/services/userAuth/user-authenticate-service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: UserAuthenticateService) {}

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authenticationService.currentUserValue;
    // if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${btoa("admin:1234")}`,
        },
      });
    // }

    return next.handle(request);
  }
}

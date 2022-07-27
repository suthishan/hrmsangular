import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// Bootstrap DataTable
import { DataTablesModule } from "angular-datatables";
import { ToastrModule } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { JwtInterceptor } from "./helpers/interceptor/jwt.interceptor";
import { ErrorInterceptor } from "./helpers/interceptor/error.interceptor";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { RouterModule } from "@angular/router";

// import { ROUTES }   from './app-routing.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    // RouterModule.forRoot(ROUTES, { onSameUrlNavigation: 'reload' }),
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
   
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: "environment", useValue: environment },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent,[

  ]],
})
export class AppModule {}


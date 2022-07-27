import { Component, OnInit } from "@angular/core";
import { UserAuthenticateService } from "src/app/services/userAuth/user-authenticate-service";

@Component({
  selector: "app-employee-dashboard",
  templateUrl: "./employee-dashboard.component.html",
  styleUrls: ["./employee-dashboard.component.css"],
})
export class EmployeeDashboardComponent implements OnInit {
  userData;
  d1 = new Date();
  currentDate;
  constructor(private userAuthenticate: UserAuthenticateService) {
    this.userData = this.userAuthenticate.currentUserValue;
  }

  ngOnInit() {
    this.getCuurentDate();
  }

  getCuurentDate() {
    this.currentDate = this.d1.toLocaleString("en-US", {
      weekday: "long", // long, short, narrow
      day: "numeric", // numeric, 2-digit
      year: "numeric", // numeric, 2-digit
      month: "long", // numeric, 2-digit, long, short, narrow
    });
  }
}

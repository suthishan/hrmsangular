import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserAuthenticateService } from "src/app/services/userAuth/user-authenticate-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  public loginError;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userAuth: UserAuthenticateService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() {
    return this.loginForm.controls;
  }

  login(loginData) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userAuth.userLogin(loginData).subscribe(
      (res) => {
        console.log(res);
        var status = res['result'];
        if (status==="success") {
          localStorage.setItem("currentUser", JSON.stringify(res.Login_Details));
          this.userAuth.currentUserSubject.next(res.result);
            this.router.navigate(["/dashboard/employee"]);
          // if(r)
          // if (res.Login_Details.emp_role == "user") {
            // this.router.navigate(["/dashboard/employee"]);
          // } else {
          //   this.router.navigateByUrl("/dashboard/admin");
          // }

          this.loading = false;
        } else {
          console.log(res);
          console.log(res['status']);
          this.loginError = res;
          this.loading = false;
          console.log(this.loginError);
        }
      },
      (err) => {
        this.loginError = err.message;
        this.loading = false;
        console.log(this.loginError);

      }
    );
  }
}


import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserAuthenticateService } from "src/app/services/userAuth/user-authenticate-service";

@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.css"],
})
export class EmployeeProfileComponent implements OnInit {
  public addEmployeeForm: FormGroup;
  public profileDetails;
  userData: any;
  imagepath:any;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthenticateService,
  ) {}

  ngOnInit() {
    this.userData = this.userAuthService.currentUserValue;
    this.imagepath = "https://hrpanel.satvatinfosol.com/assets/Photo/"+this.userData.emp_photo;
    this.addEmployeeForm = this.formBuilder.group({
      client: ["", [Validators.required]],
    });
    this.getProfileDetails();
  }

  onSubmit() {
    this.toastr.success("Bank & statutory added", "Success");
  }

  getProfileDetails() {
     this.userAuthService.getProfileDetails().toPromise().then((res:any)=>{
       if(res.status==='1'){
         this.profileDetails = res.result;
         console.log(this.profileDetails);
       }
     })
  }

  public get getUserId() {
   return this.userAuthService.currentUserValue ? this.userAuthService.currentUserValue : '';
  }
}

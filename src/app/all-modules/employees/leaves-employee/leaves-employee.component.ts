import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { UserAuthenticateService } from "src/app/services/userAuth/user-authenticate-service";
import { LeaveService } from "src/app/services/leave/leave-service";
declare const $: any;
@Component({
  selector: "app-leaves-employee",
  templateUrl: "./leaves-employee.component.html",
  styleUrls: ["./leaves-employee.component.css"],
})
export class LeavesEmployeeComponent implements OnInit, OnDestroy {
  lstLeave: any[];
  userData;
  url: any = "employeeleaves";
  userTeamData;
  public tempId: any;
  public editId: any;

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addLeaveadminForm: FormGroup;
  public editLeaveadminForm: FormGroup;
  public editFromDate: any;
  public editToDate: any;
  public minDateForFromDate:any;

  leaveTypes = [
    { id: "FHL", leaveName: "Morning Half Day Leave" },
    { id: "AHL", leaveName: "Evening Half Day Leave" },
    { id: "L", leaveName: "Full Day Leave" },
    // { id: "PR", leaveName: "Permission" },
    // { id: "OD", leaveName: "On Duty" },
    // { id: "OD_L", leaveName: "Full Day on Duty" },
    // { id: "OD_FHL", leaveName: "Morning Half Day on Duty" },
    // { id: "OD_AHL", leaveName: "Evening Half Day on Duty" },
    // { id: "OD_PR", leaveName: "Hours Only on Duty" },
    // { id: "RH", leaveName: "Restricted Holiday" },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private userAuthService: UserAuthenticateService,
    private leaveService: LeaveService
  ) {
    this.userData = this.userAuthService.currentUserValue;
  }

  ngOnInit() {
    this.loadLeaves();

    this.addLeaveadminForm = this.formBuilder.group({
      addLeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      // RemainLeaves: ["", [Validators.required]],
      LeaveReason: ["", [Validators.required]],
      pendingWork: [""],
      taskAssignBy: [""],
      taskAssignTo: [""],
      reporting1: ["", [Validators.required]],
      reporting2: ["", [Validators.required]],
      hr: ["", [Validators.required]],
      sanctioningAuthority: ["", [Validators.required]],
      approvingAuthority: ["", [Validators.required]],
    });

    // Edit leaveadmin Form Validation And Getting Values

    this.editLeaveadminForm = this.formBuilder.group({
      LeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      NoOfDays: ["", [Validators.required]],
      RemainLeaves: ["", [Validators.required]],
      LeaveReason: ["", [Validators.required]],
    });

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  

  // Get leave  Api Call
  loadLeaves() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstLeave = data;
      this.dtTrigger.next();
      this.rows = this.lstLeave;
      this.srch = [...this.rows];
    });
  }

  // Add leaves for admin Modal Api Call
  addleaves() {
    if (this.addLeaveadminForm.valid) {
      const formData = new FormData();
      formData.append('emp_location',this.userData.emp_location);
      formData.append('user_id',this.userData.uId)
      formData.append('txt_from_date',this.dateFormat(this.addLeaveadminForm.value.From))
      formData.append('txt_to_date',this.addLeaveadminForm.value.To ? this.dateFormat(this.addLeaveadminForm.value.To) : this.dateFormat(this.addLeaveadminForm.value.From));
      formData.append('txt_emergency',JSON.stringify(this.isEmergency(this.addLeaveadminForm.value.From,this.addLeaveadminForm.value.To ? this.addLeaveadminForm.value.To: null)));
      formData.append('txt_reason',this.addLeaveadminForm.value.LeaveReason);
      formData.append('txt_request_hr',this.addLeaveadminForm.value.hr);
      formData.append('txt_request_hod1',this.addLeaveadminForm.value.reporting1)
      formData.append('txt_request_hod2',this.addLeaveadminForm.value.reporting2)
      formData.append('txt_sanc_auth',this.addLeaveadminForm.value.sanctioningAuthority)
      formData.append('txt_appr_auth', this.addLeaveadminForm.value.approvingAuthority)
      formData.append('bt_submit','submit')
      this.leaveService.addLeave("Leavepage/leave_apply", formData).subscribe((res) => {
        // this.loadLeaves();
        $("#add_leave").modal("hide");
        this.addLeaveadminForm.reset();
        this.toastr.success(res.message, "Success");
      });
    }
     else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }
  changeValidate(val) {
    if (val === "L") {
      this.addLeaveadminForm.controls["To"].setValidators(Validators.required);
      this.addLeaveadminForm.controls["To"].setValue(null);
      this.addLeaveadminForm.controls["To"].updateValueAndValidity();
    } else {
      this.addLeaveadminForm.controls["To"].clearValidators();
      this.addLeaveadminForm.controls["To"].setValue(null);
      this.addLeaveadminForm.controls["To"].updateValueAndValidity();
    }
  }

  from(data) {
    this.editFromDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editToDate = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit leaves Modal Api Call
  editLeaves() {
    if (this.editLeaveadminForm.valid) {
      let obj = {
        employeeName: "Mike Litorus",
        designation: "web developer",
        leaveType: this.editLeaveadminForm.value.LeaveType,
        from: this.editFromDate,
        to: this.editToDate,
        noofDays: this.editLeaveadminForm.value.NoOfDays,
        remainleaves: this.editLeaveadminForm.value.RemainLeaves,
        reason: this.editLeaveadminForm.value.LeaveReason,
        status: "Approved",
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadLeaves();
      $("#edit_leave").modal("hide");
      this.toastr.success("Leaves Updated sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // Delete leaves Modal Api Call

  deleteleaves() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      // this.loadLeaves();
      $("#delete_approve").modal("hide");
      this.toastr.success("Leaves deleted sucessfully..!", "Success");
    });
  }

  // To Get The leaves Edit Id And Set Values To Edit Modal Form

  edit(value) {
    this.editId = value;
    const index = this.lstLeave.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstLeave[index];
    this.editLeaveadminForm.setValue({
      LeaveType: toSetValues.leaveType,
      From: toSetValues.from,
      To: toSetValues.to,
      NoOfDays: toSetValues.noofDays,
      RemainLeaves: toSetValues.remainleaves,
      LeaveReason: toSetValues.reason,
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.addLeaveadminForm.reset();
  }

  getReportingData() {
    if(!this.userTeamData){
      this.leaveService.getDefaultApi("master").subscribe((res) => {
        this.userTeamData = res.result_data;
        this.updateFormValue();
      });
    }
    else{
      this.addLeaveadminForm.reset();
      this.updateFormValue();
    }
  }

  updateFormValue() {
    this.userTeamData?.taskassignby?.length === 1 &&
      this.addLeaveadminForm
        .get("taskAssignBy")
        .setValue(this.userTeamData?.taskassignby[0].id);

    this.userTeamData?.assigned_to?.length === 1 &&
      this.addLeaveadminForm
        .get("taskAssignTo")
        .setValue(this.userTeamData?.assigned_to[0].name);

    this.userTeamData?.report_1?.length === 1 &&
      this.addLeaveadminForm
        .get("reporting1")
        .setValue(this.userTeamData?.report_1[0].id);

    this.userTeamData?.report_2?.length === 1 &&
      this.addLeaveadminForm
        .get("reporting2")
        .setValue(this.userTeamData?.report_2[0].id);

    this.userTeamData?.hr_report?.length === 1 &&
      this.addLeaveadminForm
        .get("hr")
        .setValue(this.userTeamData?.hr_report[0].id);

    this.userTeamData?.appr_auth?.length === 1 &&
      this.addLeaveadminForm
        .get("approvingAuthority")
        .setValue(this.userTeamData?.appr_auth[0].id);

    this.userTeamData?.sanc_auth?.length === 1 &&
      this.addLeaveadminForm
        .get("sanctioningAuthority")
        .setValue(this.userTeamData?.sanc_auth[0].id);
  }

  getNumberOfDay(d1, d2) {
    const diffInMs = d1 - d2;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays;
  }

  selectMinDateForToDate() {
    if(this.addLeaveadminForm.get('From').value){
      this.addLeaveadminForm.get('To').setValue(null);
     this.minDateForFromDate = new Date(this.addLeaveadminForm.get('From').value) 
    }
  }

  get minDate() {
    return new Date();
  }

  public dateFormat(val) {
    var dateObj = new Date(val);
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

return `${day}-${ month}-${year}`;
  }

  public isEmergency(date1,date2) {
    let from_date1 = new Date(date1);
    let from_date2 = new Date(date2);
    if(date2){
      if(from_date2.getDate() > from_date1.getDate() ){
        
        return 0;
      }
      if((from_date2.getDate() == from_date1.getDate()) && (from_date2.getMonth() == from_date1.getMonth())){
        let todayDate = new Date();
        if(todayDate.getDate() === from_date1.getDate() && todayDate.getDate() === from_date1.getDate()){
          return 1;
        }
        return 0;
      }
    
  
      return 0;
    }
    else{
      if(new Date(new Date()).setHours(0,0,0,0) === new Date(from_date1).setHours(0,0,0,0)){
        const today = new Date(new Date());
        const diffDays:any = this.days_between(today,from_date1);
        if(diffDays == 0){
          return 1
        }
        return 0;
      
            }
            return 0;
    }
  }

   days_between(date1, date2) {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

}
}
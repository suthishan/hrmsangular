import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { ConferenceService } from 'src/app/services/conference/conference.service';
// import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
// import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

declare const $: any;

@Component({
  selector: 'app-conference-list',
  templateUrl: './conference-list.component.html',
  styleUrls: ['./conference-list.component.css']
})
export class ConferenceListComponent implements OnInit {
  option1 = true;
  option2 = false;
  minDate = new Date() 
  maxDate;
  noticedDate;

  public selectedOption = "daily";
  Select_Time: any;
  public slotError;
  public slotsuccess;

  changediv(divid) {
    if (divid === "nc_signup") {
      console.log("nc");
      this.addConfereForm.controls['meeting_name'].clearValidators();
      this.addConfereForm.get('meeting_name').setValidators(null);
      this.option1 = true;
      this.option2 = false;
    }
    else if (divid === "cc_signup") {
      
      let idx = divid;
      console.log(idx);
      this.addConfereForm.controls['meeting_name'].clearValidators();
      if (idx === "cc_signup") {
        this.addConfereForm.controls['meeting_name'].setValidators([
          Validators.required,
        ]);
      }
      this.option1 = false;
      this.option2 = true;
    }
    this.addConfereForm.updateValueAndValidity();
  }
 
//   eventtimedata  = [
//   { id: 1, name: '09.00 AM - 10.00 AM' },
//   { id: 2, name: '10.30 AM - 11.30 AM' },
//   { id: 3, name: '11.30 AM - 12.30 PM' },
//   { id: 4, name: '12.30 PM - 01.30 PM' },
//   { id: 5, name: '01.30 PM - 02.30 PM' },
//   { id: 6, name: '03.30 PM - 04.30 PM' },
//   { id: 7, name: '04.30 PM - 05.30 PM' },
//   { id: 8, name: '05.30 PM - 06.30 PM' },
//   { id: 9, name: '06.30 PM - 07.30 PM' },
//   { id: 10, name: '07.30 PM - 08.30 PM' }
// ];

// eventtimedata1  = [
//   { id: 1, name: '09.00 AM - 10.00 AM' },
//   { id: 2, name: '10.30 AM - 11.30 AM' },
//   { id: 3, name: '11.30 AM - 12.30 PM' },
//   { id: 4, name: '12.30 PM - 01.30 PM' },
//   { id: 5, name: '01.30 PM - 02.30 PM' },
//   { id: 6, name: '03.30 PM - 04.30 PM' },
//   { id: 7, name: '04.30 PM - 05.30 PM' },
//   { id: 8, name: '05.30 PM - 06.30 PM' },
//   { id: 9, name: '06.30 PM - 07.30 PM' },
//   { id: 10, name: '07.30 PM - 08.30 PM' }
// ];
 selectTime1 =[];
  user:any={}

  lstconference: any[];
  // @ViewChild('ejTime') ejTime: TimePickerComponent;
  @ViewChild(DataTableDirective, { static: false })

  // public formObject: FormValidator;
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  // urldata = `http://localhost:4002/api/conference/listview`;
  // urlvalue=`http://localhost:4002/api/conference/listadd`;
  // checkDate=`http://localhost:4002/api/conference/checkDate`;
  public tempId: any;
public userForm:FormGroup;
  public addConfereForm: FormGroup;
  emp_name;
  emp_code;
  Meeting_Type: any;

  constructor(
    private formBuilder: FormBuilder,
    private moduleservice: ConferenceService,
    private toastr: ToastrService,
    
  ) {  
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 10);
   
  }

  // get timeFormArray() {
  //   return this.addConfereForm.controls.Event_Time as FormArray;
  // }
  
  ngOnInit() {

    
    this.loadlist();
    this.dtOptions = {
      pageLength: 10,
      dom: "lrtip",
    }
   
this.addConfereForm= this.formBuilder.group({
  Event_date:["", [Validators.required]],
  Conference_Hall:["", [Validators.required]],
  purpose_of_meeting:["", [Validators.required]],
  Meeting_Type:["", [Validators.required]],
  meeting_name:["", [Validators.required]],
  Select_Time:["",[Validators.required]],
  Select_session:["", [Validators.required]],
  Duration_hours:["", [Validators.required]],
  Duration_Minutes:["",[Validators.required]]
});

  }
  onGoToPage2(){
 
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
    this.loadlist();
  }

  selection(event){
    let option = event.target.value;
    console.log('id:', option);
    if(option == "Internal"){
      console.log('id:', option);
      this.option2 = false;
      this.addConfereForm.controls['meeting_name'].clearValidators();
    }else{
      this.option2 = true;
    }
    this.addConfereForm.updateValueAndValidity();
  }
  
//   updateDate(evdate: string) {
//     console.log(evdate);

//  var conferencedata =this.addConfereForm.value.Conference_Hall;
//     // var timedata = this.selectTime1;
//     // var exit_array = [];
//     // var new_array = [];
//     // new_array.length = 0;
//     var datefor = this.pipe.transform(
//       evdate,
//       "dd-MM-yyyy"
//     )

//     }

floorchange(){
  this.addConfereForm.controls['Select_Time'].reset();
}
updateDate(){
var date = this. pipe .transform(this.addConfereForm.value.Event_date, 'dd-MM-yyyy');
let obj = {
      Event_date: date,
      Conference_Hall: this.addConfereForm.value.Conference_Hall,
      Select_Time:this.addConfereForm.value.Select_Time,
    }
    if(obj.Event_date == null){
      let objerrr = {
        message:"Please Select booking date"
      }
      this.slotError = objerrr;
    }else{
      this.moduleservice.checkDateDB(obj).subscribe((data) => {
        console.log(data);
        if(data['status'] === '1'){
          this.toastr.success("Conference is free to book", "success");
          this.slotsuccess = data;
          this.slotError = null;          
        }else if(data['status'] === '0'){
          // this.addConfereForm.reset();
          // this.dtTrigger.next();
          this.toastr.error("Conference is Already Booked Please change the Slot", "Failed");
          this.slotError = data;
          this.slotsuccess = null;
          console.log(this.slotError);
        }
     });
    }
 

}

  //   if(data['status'] == "1"){
  //     var arrayData = data['result'];
  //     var objectData = Object.assign({},arrayData);
  //     var overarr = this.eventtimedata1;

  //     overarr.forEach(function(element, key) {
  //       let check_exist = "";
  //       arrayData.forEach(function(element1, key){
  //         if(element.id == element1.Event_Time){
  //           check_exist = "exist";
  //         }
  //       });
  //       if(check_exist != ''){
  //         exit_array.push(element);
  //       }
  //       if(check_exist == ''){
  //         new_array.push(element); 
  //       }
  //     });
  //     console.log("new_array Inner");
  //     console.log(new_array);
  //     this.eventtimedata = new_array;
  //     console.log("this.timeFormArray");
  //     console.log(this.timeFormArray);
  //     if(this.timeFormArray.value != new_array){
  //       this.timeFormArray.clear();
  //       this.eventtimedata.forEach(() => this.timeFormArray.push(new FormControl(false)));
  //     }else{
  //       console.log("not equal");
  //       this.eventtimedata.forEach(() => this.timeFormArray.push(new FormControl(false)));  
  //       this.timeFormArray.clear();
  //     }
  //   }else if(data['status'] == "0"){
  //     console.log("this.eventtimedata1   test");
  //     console.log(this.eventtimedata1);
  //     this.eventtimedata = this.eventtimedata1;
  //     this.eventtimedata.forEach(() => this.timeFormArray.push(new FormControl(false)));  
  //   }else{
  //     console.log("this.eventtimedata1");
  //     console.log(this.eventtimedata1);
  //     this.eventtimedata = this.eventtimedata1;
  //     this.eventtimedata.forEach(() => this.timeFormArray.push(new FormControl(false)));  
    // }
    
   
   

  
  

 
  loadlist() {
    
    this.moduleservice.get().subscribe((data) => {
      console.log("data");
      console.log(data);
      if(data['status'] === '1'){
        this.lstconference = data['result'];
        this.rows = this.lstconference;
        this.srch = [...this.rows];
      }
    })
  }

addCheckboxes() {
  console.log("time")
  console.log(this.Select_Time.value);
    this.Select_Time.forEach(() => this.Select_Time.push(new FormControl(false)));
  }

  addConferenceData(){
    console.log(this.addConfereForm.value);
    if(this.addConfereForm.value['Meeting_Type'] == "Internal"){
      console.log("this.addConfereForm.value['meeting_name']")
      console.log(this.addConfereForm.value['meeting_name'])
      this.addConfereForm.get('meeting_name').updateValueAndValidity();
      // this.addConfereForm.updateValueAndValidity();
    }
    console.log(this.addConfereForm.value);
    var getuserdata = localStorage.getItem('currentUser')
    var userData = JSON.parse(getuserdata);
    // console.log("userData");
    // console.log(userData);
        this.emp_code = userData['emp_code'];
      // console.log(this.emp_code);
        this.emp_name = userData['emp_name'];
    if (this.addConfereForm.valid) {
      this.noticedDate = this.pipe.transform(
        this.addConfereForm.value.Event_date,
        "dd-MM-yyyy"
      );
      // const selectedEvent_TimeIds = this.addConfereForm.value.Event_Time.map(
      //   (checked: any, i: string | number) => checked ? this.Select_Time[i].id : null)
      // .filter((v: any) => v !== null);
      // console.log("selectedEvent_TimeIds");
      // console.log(selectedEvent_TimeIds);

      // if(selectedEvent_TimeIds.length>1){

      //   this.toastr.error("Please Select One ...!", "Error");
      // }else{
      
        let obj = {
          Event_date: this.noticedDate,
          empcode: this.emp_code,
          empname: this.emp_name,
          Conference_Hall: this.addConfereForm.value.Conference_Hall,
          meeting_type:this.addConfereForm.value.Meeting_Type,
          purpose_of_meeting: this.addConfereForm.value.purpose_of_meeting,
          // Event_Time:selectedEvent_TimeIds,
          // Event_Time:this.addConfereForm.value.Event_Time,
          meeting_name:this.addConfereForm.value.meeting_name,
          Select_session:this.addConfereForm.value.Select_session,
          Select_Time:this.addConfereForm.value.Select_Time,
          Duration_hours:this.addConfereForm.value.Duration_hours,
          Duration_Minutes:this.addConfereForm.value.Duration_Minutes
        };
      
        this.moduleservice.add(obj).subscribe((data) => {
          console.log("data");
             console.log(data);
            if(data['status'] == '1'){
              this.slotError = null; 
              this.slotsuccess = null; 
              this.addConfereForm.reset();
              $("#datatable").DataTable().clear();
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
              });
              this.dtTrigger.next();
              this.toastr.success("Conference Room Booked...!", "Success");
            }else if(data['status'] == '0'){
              this.addConfereForm.reset();
              $("#datatable").DataTable().clear();
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
              });
              this.dtTrigger.next();
              this.toastr.error("Failed to Book Conference...!", "Failed");
            }
         });
  
         this.loadlist();
         $("#add_list").modal("hide");
         this.addConfereForm.reset();
      }

    // }
    else{
      this.toastr.error("Please Fill All the Details...!", "Failed");
    }
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}



// if(evdate != null){
    
    //   // this.eventtimedata.length = 0;
    //   this.Select_Time.clear();
    // }else{
      
    //   this.Select_Time.clear();
    // }
//


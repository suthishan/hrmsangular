import { Component, OnInit } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { AllModulesService } from "../all-modules/all-modules.service";
import { UserAuthenticateService } from "../services/userAuth/user-authenticate-service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  userData;
  urlComplete = {
    mainUrl: "",
    subUrl: "",
    childUrl: "",
  };

  sidebarMenus = {
    default: true,
    chat: false,
    settings: false,
  };

  members = {};
  groups = {};

  sideBarList = [
    {
      user: [
        { name: "Dashboard", url: "/dashboard/employee" },
        { name: "Profile", url: "/employees/employeeprofile" },
        
        // { name: "Leave request", url: "/employees/employeeleaves" },
        // { name: "Permission", url: "/employees/overtime" },
        // { name: "On-Duty", url: "/employees/attendanceemployee" },
        // { name: "Attendance", url: "/employees/attendanceemployee" },
        // { name: "Task", url: "/projects/tasks" },
        // { name: "Pay Details", url: "/payroll/employee-salary" },
      ],
      hr: [
        { name: "Dashboard", url: "/dashboard/employee" },
        { name: "Profile", url: "/employees/employeeprofile" },
        // { name: "Employee", url: "/employees/employeepage" },
        // { name: "Leave request", url: "/employees/employeeleaves" },
        // { name: "Permission", url: "/employees/overtime" },
        // { name: "On-Duty", url: "/employees/attendanceemployee" },
        // { name: "Attendance", url: "/employees/attendanceadmin" },
        // { name: "Task", url: "/projects/tasks" },
        // { name: "Request Approval", url: "/employees/adminleaves" },
        // { name: "Pay Details", url: "/payroll/employee-salary" },
      ],
      
      "hr-head": [
        { name: "Dashboard", url: "/dashboard/employee" },
        { name: "Profile", url: "/employees/employeeprofile" },
        // { name: "Employee", url: "/employees/employeepage" },
        // { name: "Leave reques", url: "/employees/employeeleaves" },
        // { name: "Permission", url: "/employees/overtime" },
        // { name: "On-Duty", url: "/employees/attendanceemployee" },
        // { name: "Attendance", url: "/employees/attendanceadmin" },
        // { name: "Task", url: "/projects/tasks" },
        // { name: "Request Approval", url: "/projects/tasks" },
        // { name: "Pay Details", url: "/payroll/employee-salary" },
      ],
      "hr-assist": [
        { name: "Dashboard", url: "/dashboard/employee" },
        { name: "Profile", url: "/employees/employeeprofile" },
        // { name: "Employee", url: "/employees/employeepage" },
        // { name: "Leave reques", url: "/employees/employeeleaves" },
        // { name: "Permission", url: "/employees/overtime" },
        // { name: "On-Duty", url: "/employees/attendanceemployee" },
        // { name: "Attendance", url: "/employees/attendanceadmin" },
        // { name: "Task", url: "/projects/tasks" },
        // { name: "Request Approval", url: "/projects/tasks" },
        // { name: "Pay Details", url: "/payroll/employee-salary" },
      ],
      admin: [
        { name: "Dashboard", url: "/dashboard/employee" },
        { name: "Profile", url: "/employees/employeeprofile" },
        // { name: "Leave request", url: "/employees/employeeleaves" },
        // { name: "Permission", url: "/employees/overtime" },
        // { name: "On-Duty", url: "/employees/attendanceemployee" },
        // { name: "Attendance", url: "/employees/attendanceadmin" },
        // { name: "Task", url: "/projects/tasks" },
        // { name: "Pay Details", url: "/payroll/employee-salary" },
      ],
      CEO: [
        { name: "Dashboard", url: "/dashboard/employee" },
        { name: "Profile", url: "/employees/employeeprofile" },
        // { name: "Leave request", url: "/employees/employeeleaves" },
        // { name: "Permission", url: "/employees/overtime" },
        // { name: "On-Duty", url: "/employees/attendanceemployee" },
        // { name: "Attendance", url: "/employees/attendanceadmin" },
        // { name: "Task", url: "/projects/tasks" },
        // { name: "Pay Details", url: "/payroll/employee-salary" },
      ],
      MD: [
        { name: "Dashboard", url: "/dashboard/employee" },
        { name: "Profile", url: "/employees/employeeprofile" },
        // { name: "Leave request", url: "/employees/employeeleaves" },
        // { name: "Permission", url: "/employees/overtime" },
        // { name: "On-Duty", url: "/employees/attendanceemployee" },
        // { name: "Attendance", url: "/employees/attendanceadmin" },
        // { name: "Task", url: "/projects/tasks" },
        // { name: "Pay Details", url: "/payroll/employee-salary" },
      ],
     
    },
  ];

  constructor(
    private router: Router,
    private allModulesService: AllModulesService,
    public userAuthSearvice: UserAuthenticateService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $(".main-wrapper").removeClass("slide-nav");
        $(".sidebar-overlay").removeClass("opened");
        const url = event.url.split("/");
        this.urlComplete.mainUrl = url[1];
        this.urlComplete.subUrl = url[2];
        this.urlComplete.childUrl = url[3];
        if (url[1] === "") {
          this.urlComplete.mainUrl = "dashboard";
          this.urlComplete.subUrl = "admin";
        }

        if (url[2] === "chat" || url[2] === "calls") {
          this.sidebarMenus.chat = true;
          this.sidebarMenus.default = false;
        } else {
          this.sidebarMenus.chat = false;
          this.sidebarMenus.default = true;
        }
      }
    });

    this.groups = { ...this.allModulesService.groups };
    this.members = { ...this.allModulesService.members };
  }

  ngOnInit() {
    this.userData = this.userAuthSearvice.currentUserValue;
    // Slide up and down of menus
    console.log(this.userData);
    $(document).on("click", "#sidebar-menu a", function (e) {
      e.stopImmediatePropagation();
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      }
    });
  }

  setActive(member) {
    this.allModulesService.members.active = member;
  }
}

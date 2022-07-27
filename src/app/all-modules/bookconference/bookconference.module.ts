import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { BookconferenceRoutingModule } from './bookconference-routing.module';
import { BookconferenceComponent } from './bookconference.component';
import { ConferenceListComponent } from './conference-list/conference-list.component';
import { ConferenceService } from 'src/app/services/conference/conference.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { PickListModule } from 'primeng/picklist';
import { SharingModule } from 'src/app/sharing/sharing.module';
// import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [BookconferenceComponent, ConferenceListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    PickListModule,
    SharingModule,
    BsDatepickerModule.forRoot(),
    // TimePickerModule,
    BookconferenceRoutingModule
  ],
  providers: [
    // ConferenceService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ]
})
export class BookconferenceModule { }

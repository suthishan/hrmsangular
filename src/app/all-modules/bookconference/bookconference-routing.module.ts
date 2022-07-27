import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookconferenceComponent } from './bookconference.component';
import { ConferenceListComponent } from './conference-list/conference-list.component';

const routes: Routes = [
  {
    path:"",
    component:BookconferenceComponent,
    children:[
     {
      path:"conference-list",
      component:ConferenceListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookconferenceRoutingModule { }

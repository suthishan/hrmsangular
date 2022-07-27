import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookconference',
  templateUrl: './bookconference.component.html',
  styleUrls: ['./bookconference.component.css']
})
export class BookconferenceComponent implements OnInit {

  public innerHeight: any;
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(private ngZone: NgZone) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
  }
  
  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
  }
}

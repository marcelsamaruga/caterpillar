import { Activity } from './../../model/activity.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {

  activity: Activity;
  courtyard;
  swing;
  gym;
  sunbath;

  ngOnInit() {
    this.activity = {id: '1',gym:  false, sunbath: false, courtyard: false, swing: false,
    dateTime: null, formula: false, breast: false}; 
  }

  onSaveActivity() {
  }

}

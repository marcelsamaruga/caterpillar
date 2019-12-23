import { Component, OnInit } from '@angular/core';
import { Activity } from '../../model/activity.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {

  activity: Activity = {};
  courtyard;
  swing;
  gym;
  sunbath;


  ngOnInit() {
    this.activity.courtyard = true;
  }

  onSaveActivity() {
    console.log(this.courtyard);
    console.log(this.gym);
    console.log(this.activity);
  }

}

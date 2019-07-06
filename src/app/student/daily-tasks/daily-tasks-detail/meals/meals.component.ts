import { OnInit, Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
})
export class MealsComponent implements OnInit {
  @Input("title") title: string;
  @Input("description") description: string;
  showDesc = false;

  constructor() { }

  ngOnInit() {
    this.showDesc = this.description && this.description.length > 0;
  }

  showDescription() {
    this.showDesc = true;
  }

}

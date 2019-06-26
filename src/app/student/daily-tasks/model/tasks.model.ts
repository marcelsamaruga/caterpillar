import { Student } from "../../student.model";
import { DiaperChange } from "../model/diaper-change.model";
import { BreastFeed } from './breastfeed.model';
export class Task {
  constructor(
    public id: string,
    public date: Date = new Date(),
    public student: Student,
    public diaperChange: DiaperChange[] = [],
    public breastFeed: BreastFeed[] = [],
    public sunBath: boolean = false,
    public gym: boolean = false
  ) {}
}

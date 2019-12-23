import { Student } from "../../student.model";
import { Activity } from "../model/activity.model";
import { DiaperChange } from "../model/diaper-change.model";
import { BreastFeed } from './breastfeed.model';
import { Meal } from './meal.model';
export interface Task {
    id: string;
    date: Date;
    student: Student;
    diaperChange: DiaperChange[];
    breastFeed: BreastFeed[];
    sunBath: boolean;
    gym: boolean;
    meal: Meal[];
    activity: Activity[];
}

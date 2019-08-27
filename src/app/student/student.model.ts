import { Photo } from './photos/photo.model';
import { Task } from './daily-tasks/model/tasks.model';

export class Student {
  constructor(
    public id: string,
    public firstName: string,
    public imageProfile: any,
    public contact1: string,
    public lastName: string,
    public images?: Photo[],
    public birthday?: Date,
    public contact2?: string,
    public tasks?: Task[],
    public photo?: Photo[]
  ) {}
}

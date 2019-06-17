import { Photo } from './photos/photo.model';

export class Student {
  constructor(
    public id: string,
    public firstName: string,
    public imageUrl: string,
    public contact1: string,
    public lastName?: string,
    public images?: Photo[],
    public birthday?: Date,
    public contact2?: string
  ) {}
}

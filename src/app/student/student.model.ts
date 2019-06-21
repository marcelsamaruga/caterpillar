import { Photo } from './photos/photo.model';

export class Student {
  constructor(
    public firstName: string,
    public imageUrl: any,
    public contact1: string,
    public lastName?: string,
    public images?: Photo[],
    public birthday?: Date,
    public contact2?: string
  ) {}
}

import { Photo } from './photos/photo.model';

export class Student {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public imageUrl: string,
    public images: Photo[],
    public birthday?: Date
  ) {}
}

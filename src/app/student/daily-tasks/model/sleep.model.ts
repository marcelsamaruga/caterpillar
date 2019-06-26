export class Sleep {
  constructor(
    public id: string,
    public from: Date = new Date(),
    public to: Date = new Date()
  ) {}
}

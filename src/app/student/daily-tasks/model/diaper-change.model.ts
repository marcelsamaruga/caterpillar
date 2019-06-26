export class DiaperChange {
  constructor(
    public id: string,
    public dateTime: Date = new Date(),
    public poop: boolean = false,
    public piss: boolean = true
  ) {}
}

interface TimeEntry {
  date?: Date;
  in: number;
  out: number;
}

export class TimeLog {
  protected _time: TimeEntry;
  constructor(time: TimeEntry) {
    this._time = time;
  }

  get timein() {
    return this._time.in;
  }

  set timein(time: number) {
    this._time.in = time;
    this._time.date = new Date(time);
  }

  get timeout() {
    return this._time.out;
  }

  set timeout(time: number) {
    this._time.out = time;
  }

  public elapsedTime(start: number, end: number): number {
    return end - start;
  }

  public startTime(): void {
    this._time.in = Date.now();
    const timeinDisplayContainer = document.querySelector(
      ".ts-timein-display",
    ) as HTMLSpanElement;
    const date = new Date(this._time.in);
    timeinDisplayContainer.innerText = `April ${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  public stopTime(): void {
    this._time.in = Date.now();
  }
}

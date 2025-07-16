interface TimeEntry {
  date?: Date;
  in: number;
  out: number;
}

export class TimeLog {
  protected _time: TimeEntry;
  protected _pauseStart: number;
  protected _pauseTotalTime: number;
  constructor(time: TimeEntry) {
    this._time = time;
    this._pauseStart = 0;
    this._pauseTotalTime = 0;
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
    const pause = this._pauseTotalTime;
    return (end - start - pause) / 1000;
  }

  public startTime(): void {
    this._time.in = Date.now();
    const timeinDisplayContainer = document.querySelector(
      ".ts-timein-display",
    ) as HTMLSpanElement;
    const date = new Date(this._time.in);
    timeinDisplayContainer.innerText = `April ${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(
      `Time is started: ${this.elapsedTime(this._time.in, Date.now())}`,
    );
  }

  public stopTime(): void {
    this._time.out = Date.now();
    console.log(
      `Time is stopped: ${this.elapsedTime(this._time.in, Date.now())}`,
    );
  }

  public pauseTime(): void {
    this._pauseStart = Date.now();
    console.log(
      `Time is paused: ${this.elapsedTime(this._time.in, Date.now())}`,
    );
  }

  public resumeTime(): void {
    this._pauseTotalTime += Date.now() - this._pauseStart;
    console.log(
      `Time is resumed: ${this.elapsedTime(this._time.in, Date.now())}`,
    );
  }
}

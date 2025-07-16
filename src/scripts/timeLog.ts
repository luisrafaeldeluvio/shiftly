import { formatDate } from "./time";

interface TimeEntry {
  date?: Date;
  in: number;
  out: number;
}

export class TimeLog {
  protected _time: TimeEntry;
  protected _pauseStart: number;
  protected _pauseTotalTime: number;
  protected _isPaused: boolean;
  protected _isRunning: boolean;

  constructor(time: TimeEntry) {
    this._time = time;
    this._pauseStart = 0;
    this._pauseTotalTime = 0;
    this._isPaused = false;
    this._isRunning = false;
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

  get isPaused() {
    return this._isPaused;
  }

  get isRunning() {
    return this._isRunning;
  }

  public elapsedTime(start: number, end?: number): number {
    let pause = this._pauseTotalTime;
    if (end) {
      console.log(end, start, pause);
      return (end - start - pause) / 1000;
    } else {
      return (Date.now() - start - pause) / 1000;
    }
  }

  public startTime(): void {
    this._time.in = Date.now();
    const timeinDisplayContainer = document.querySelector(
      ".ts-timein-display",
    ) as HTMLSpanElement;
    timeinDisplayContainer.innerText = formatDate(this._time.in);
    this._isRunning = true;
  }

  public stopTime(): void {
    this._time.out = Date.now();
    this._isRunning = false;
    console.log(this._pauseStart, this._isPaused);

    if (this._pauseStart > 0 && this._isPaused) {
      this.resumeTime();
    }
  }

  public pauseTime(): void {
    this._pauseStart = Date.now();
    this._isPaused = true;
    console.log(this._pauseStart / 1000);
  }

  public resumeTime(): void {
    console.log("resumed time happened");
    this._pauseTotalTime += Date.now() - this._pauseStart;
    this._isPaused = false;
  }
}

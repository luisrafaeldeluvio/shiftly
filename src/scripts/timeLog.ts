import dayjs from "dayjs";

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

  public elapsedTime(end?: number): number {
    const pause = this._pauseTotalTime;
    const start = this._time.in;
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
    timeinDisplayContainer.innerText = dayjs(this._time.in).format(
      "MMMM, DD HH:MM:ss",
    );
    this._isRunning = true;
  }

  public stopTime(): void {
    this._time.out = Date.now();
    this._isRunning = false;
    console.log(this._pauseStart, this._isPaused);

    if (this._pauseStart > 0 && this._isPaused) {
      this.resumeTime();
    }

    this._pauseStart = 0;
    this._pauseTotalTime = 0;

    console.log(this.timein, this.timeout, this.elapsedTime());
  }

  public pauseTime(): void {
    this._pauseStart = Date.now();
    this._isPaused = true;
  }

  public resumeTime(): void {
    this._pauseTotalTime += Date.now() - this._pauseStart;
    this._isPaused = false;
  }
}

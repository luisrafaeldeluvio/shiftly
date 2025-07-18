export class TimeLog {
  public date: Date | undefined = undefined;
  public timein: number | undefined = undefined;
  public timeout: number | undefined = undefined;
  public pauseStart: number | undefined = undefined;
  public pauseTotalTime: number = 0;
  public isPaused: boolean = false;
  public isRunning: boolean = false;

  public elapsedTime(end?: number): number {
    const pause = this.pauseTotalTime;
    const start = this.timein;

    if (!start) {
      return 0;
    }

    return end ? end : Date.now() - start - pause;
  }

  public startTime(): void {
    if (this.isRunning) {
      return;
    }

    this.timein = Date.now();
    this.isRunning = true;
  }

  public stopTime(): void {
    if (!this.isRunning || !this.pauseStart) {
      return;
    }

    if (this.isPaused) {
      this.resumeTime();
    }

    this.timeout = Date.now();
    this.isRunning = false;

    this.pauseStart = undefined;
    this.pauseTotalTime = 0;
  }

  public pauseTime(): void {
    if (!this.isRunning) {
      return;
    }

    this.pauseStart = Date.now();
    this.isPaused = true;
  }

  public resumeTime(): void {
    if (!this.isRunning || !this.pauseStart) {
      return;
    }

    this.pauseTotalTime += Date.now() - this.pauseStart;
    this.isPaused = false;
  }
}

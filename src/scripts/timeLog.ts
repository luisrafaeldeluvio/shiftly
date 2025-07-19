export class TimeLog {
  public timein: number | undefined = undefined;
  public timeout: number | undefined = undefined;
  public pauseStartTime: number | undefined = undefined;
  public pauseTotalTime: number = 0;
  public isPaused: boolean = false;
  public isRunning: boolean = false;

  public get elapsedTime(): number {
    if (!this.timein) {
      return 0;
    }

    const end: number = this.timeout ?? Date.now();
    let pauseCurrentTotalTime: number = 0;

    if (this.isPaused && this.pauseStartTime) {
      pauseCurrentTotalTime =
        Date.now() - this.pauseStartTime + this.pauseTotalTime;
    }

    return end - this.timein - pauseCurrentTotalTime;
  }

  public get time() {
    if (this.isRunning) {
      return undefined;
    }

    this.pauseStartTime = undefined;
    this.pauseTotalTime = 0;

    return {
      timein: this.timein,
      timeout: this.timeout,
      total: this.elapsedTime,
    };
  }

  public startTime(): void {
    if (this.isRunning) {
      return;
    }

    this.timeout = undefined;
    this.timein = Date.now();
    this.isRunning = true;
  }

  public stopTime(): void {
    if (!this.isRunning) {
      return;
    }

    this.timeout = Date.now();
    this.isRunning = false;
  }

  public pauseTime(): void {
    if (!this.isRunning || this.isPaused) {
      return;
    }

    this.pauseStartTime = Date.now();
    this.isPaused = true;
  }

  public resumeTime(): void {
    if (!this.isRunning || !this.pauseStartTime || !this.isPaused) {
      return;
    }

    this.pauseTotalTime += Date.now() - this.pauseStartTime;
    this.pauseStartTime = undefined;
    this.isPaused = false;
  }
}

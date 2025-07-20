export class TimeLog {
  private timein: number | undefined = undefined;
  private timeout: number | undefined = undefined;
  public isRunning: boolean = false;

  public get elapsedTime(): number {
    if (!this.timein) {
      return 0;
    }

    const end: number = this.timeout ?? Date.now();

    return end - this.timein;
  }

  public get time() {
    if (this.isRunning) {
      return undefined;
    }

    return {
      date: this.timein,
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
}

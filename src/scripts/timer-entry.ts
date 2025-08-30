import { db } from "./db";

class TimerEntry {
  private initialTime: number | undefined = undefined;
  private finalTime: number | undefined = undefined;
  public pauseStartTime: number | undefined = undefined;
  public pauseTotalTime: number = 0;
  public isPaused: boolean = false;
  public isRunning: boolean = false;

  public get elapsedTime(): number {
    if (!this.initialTime) return 0;

    const end: number = this.finalTime ?? Date.now();
    let pauseCurrentTotalTime: number = this.pauseTotalTime;

    if (this.isPaused && this.pauseStartTime) {
      pauseCurrentTotalTime =
        Date.now() - this.pauseStartTime + this.pauseTotalTime;
    }

    return end - this.initialTime - pauseCurrentTotalTime;
  }

  public get time() {
    if (this.isRunning) return undefined;

    return {
      date: this.initialTime,
      initialTime: this.initialTime,
      finalTime: this.finalTime,
      total: this.elapsedTime,
    };
  }

  public start(): void {
    if (this.isRunning) return;

    this.initialTime = Date.now();
    this.isRunning = true;
  }

  public stop(): void {
    if (!this.isRunning || !this.initialTime) return;

    this.finalTime = Date.now();
    this.resume();

    db.timerEntries
      .put({
        initialTime: this.initialTime,
        finalTime: this.finalTime,
        totalPause: this.pauseTotalTime,
      })
      .catch((e) => {
        console.error(e);
      });

    this.finalTime = undefined;
    this.pauseTotalTime = 0;
    this.isRunning = false;
  }

  public pause(): void {
    if (!this.isRunning || this.isPaused) return;

    this.pauseStartTime = Date.now();
    this.isPaused = true;
  }

  public resume(): void {
    if (!this.isRunning || !this.pauseStartTime || !this.isPaused) return;

    this.pauseTotalTime += Date.now() - this.pauseStartTime;
    this.pauseStartTime = undefined;
    this.isPaused = false;
  }
}

export const timer = new TimerEntry();

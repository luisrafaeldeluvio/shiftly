import { db } from "./db";
import { timerSnapshot } from "./timerSnapshot";

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

  public start(
    isPaused?: boolean,
    initialTime?: number,
    pauseTotalTime?: number,
  ): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.initialTime = initialTime
      ? initialTime - (pauseTotalTime ?? 0)
      : Date.now();
    if (isPaused) this.pause();

    timerSnapshot.makeSnapshot({
      initialTime: this.initialTime,
      pauseTotalTime: this.pauseTotalTime,
      isPaused: this.isPaused,
    });
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
    timerSnapshot.removeSnapshot();
  }

  public pause(): void {
    if (!this.isRunning || this.isPaused || !this.initialTime) return;

    this.pauseStartTime = Date.now();
    this.isPaused = true;

    timerSnapshot.makeSnapshot({
      initialTime: this.initialTime,
      pauseTotalTime: this.pauseTotalTime,
      isPaused: this.isPaused,
    });
  }

  public resume(): void {
    if (
      !this.isRunning ||
      !this.pauseStartTime ||
      !this.isPaused ||
      !this.initialTime
    )
      return;

    this.pauseTotalTime += Date.now() - this.pauseStartTime;
    this.pauseStartTime = undefined;
    this.isPaused = false;
    timerSnapshot.makeSnapshot({
      initialTime: this.initialTime,
      pauseTotalTime: this.pauseTotalTime,
      isPaused: this.isPaused,
    });
  }
}

export const timer = new TimerEntry();

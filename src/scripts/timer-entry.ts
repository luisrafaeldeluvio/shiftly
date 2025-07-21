import { db } from "./db";

export class TimerEntry {
  private initialTime: number | undefined = undefined;
  private finalTime: number | undefined = undefined;
  public isRunning: boolean = false;

  public get elapsedTime(): number {
    if (!this.initialTime) {
      return 0;
    }

    const end: number = this.finalTime ?? Date.now();

    return end - this.initialTime;
  }

  public get time() {
    if (this.isRunning) {
      return undefined;
    }

    return {
      date: this.initialTime,
      initialTime: this.initialTime,
      finalTime: this.finalTime,
      total: this.elapsedTime,
    };
  }

  public start(): void {
    if (this.isRunning) {
      return;
    }

    this.finalTime = undefined;
    this.initialTime = Date.now();
    this.isRunning = true;
  }

  public stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.finalTime = Date.now();
    this.isRunning = false;

    if (this.initialTime && this.finalTime) {
      db.timerEntries
        .put({
          initialTime: this.initialTime,
          finalTime: this.finalTime,
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
}

interface snapshot {
  initialTime: number;
  pauseTotalTime: number;
  isPaused: boolean;
}

class TimerSnapshot {
  private snapshot: snapshot = {
    initialTime: 0,
    pauseTotalTime: 0,
    isPaused: false,
  };

  public makeSnapshot(snapshot: snapshot): void {
    this.snapshot = {
      initialTime: snapshot.initialTime,
      pauseTotalTime: snapshot.pauseTotalTime,
      isPaused: snapshot.isPaused,
    };
    localStorage.setItem("timerSnapshot", JSON.stringify(this.snapshot));
  }

  public getSnapshot(): string {
    const snapshot = localStorage.getItem("timerSnapshot");
    return snapshot ? snapshot : "{}";
  }

  public removeSnapshot(): void {
    localStorage.removeItem("timerSnapshot");
  }
}

export const timerSnapshot = new TimerSnapshot();

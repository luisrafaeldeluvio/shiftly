type pause = [number, number];

class TimerSnapshot {
  private snapshot: { inititalTime: number; pauseList: pause[] } = {
    inititalTime: 0,
    pauseList: [],
  };

  public makeSnapshot(inititalTime: number, pauseList: pause[]): void {
    this.snapshot = {
      inititalTime: inititalTime,
      pauseList: pauseList,
    };
    localStorage.setItem("timerSnapshot", JSON.stringify(this.snapshot));
  }

  public getSnapshot() {
    return localStorage.getItem("timerSnapshot");
  }
}

export const timerSnapshot = new TimerSnapshot();

import { timer } from "./timer-entry";
import { getElement } from "./helpers/get-element";

class TimerUIController {
  private readonly timer: Element = getElement(".timer");
  private readonly controls: Element = getElement(
    ".timer__controls",
    this.timer,
  );
  private readonly startButton: Element = getElement(
    ".ts-timestart",
    this.timer,
  );
  private readonly stopButton: Element = getElement(".ts-timestop", this.timer);
  private readonly pauseIcon: Element = getElement(
    ".ts-timer-pause-icon",
    this.timer,
  );
  private readonly resumeIcon: Element = getElement(
    ".ts-timer-resume-icon",
    this.timer,
  );
  private readonly display: Element = getElement(
    ".ts-timer-display",
    this.timer,
  );
  isTimerCollapsed: boolean = false;

  setDisplay(text: string | number): void {
    this.display.textContent = text.toString();
  }

  toggle(): void {
    const isActive = this.startButton.classList.contains(
      "timer__start--active",
    );

    this.startButton.classList.toggle("timer__start--active", !isActive);
    this.controls.classList.toggle("hidden", isActive);

    if (isActive) this.setDisplay("TIME IN");
  }

  private toggleControlsIcon(): void {
    this.pauseIcon.classList.toggle("hidden", timer.isPaused);
    this.resumeIcon.classList.toggle("hidden", !timer.isPaused);
  }

  toggleControls(): void {
    if (timer.isPaused) {
      timer.resume();
    } else {
      timer.pause();
    }

    this.toggleControlsIcon();
  }

  collapse(): void {
    this.timer.classList.toggle("timer--collapsed");
    this.controls.classList.toggle("timer__controls--collapsed");
    this.startButton.classList.toggle("button--s");

    this.stopButton.querySelector("span")?.classList.toggle("hidden");
    this.stopButton.querySelector("img")?.classList.toggle("hidden");

    this.isTimerCollapsed = !this.isTimerCollapsed;
  }
}

export const timerUIController = new TimerUIController();

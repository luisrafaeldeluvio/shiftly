import { timer } from "./main";
import { getElement } from "./helpers/get-element";

export class TimerUIController {
  private readonly timer: Element;
  private readonly controls: Element;
  private readonly startButton: Element;
  private readonly stopButton: Element;
  private readonly pauseIcon: Element;
  private readonly resumeIcon: Element;
  private readonly display: Element;

  constructor() {
    this.timer = getElement(".timer");
    this.controls = getElement(".timer__controls", this.timer);
    this.startButton = getElement(".ts-timestart", this.timer);
    this.stopButton = getElement(".ts-timestop", this.timer);
    this.pauseIcon = getElement(".ts-timer-pause-icon", this.timer);
    this.resumeIcon = getElement(".ts-timer-resume-icon", this.timer);
    this.display = getElement(".ts-timer-display", this.timer);
  }

  toggle(): void {
    const isActive = this.startButton.classList.contains(
      "timer__start--active",
    );

    this.startButton.classList.toggle("timer__start--active", !isActive);
    this.controls.classList.toggle("hidden", isActive);

    if (isActive) this.display.textContent = "TIME IN";
  }

  private toggleControlsIcon(): void {
    this.pauseIcon.classList.toggle("hidden");
    this.resumeIcon.classList.toggle("hidden");
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
  }
}

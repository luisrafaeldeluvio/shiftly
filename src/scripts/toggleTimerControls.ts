import { user } from "./main";

export function toggleTimerControls(): void {
  const pauseButton = document.querySelector(
    ".ts-timer-pause",
  ) as HTMLButtonElement;
  const resumeButton = document.querySelector(
    ".ts-timer-resume",
  ) as HTMLButtonElement;

  const ispaused: boolean = pauseButton.classList.contains("hidden");

  if (ispaused) {
    resumeButton.classList.toggle("hidden", ispaused);
    pauseButton.classList.toggle("hidden", !ispaused);
    user.resumeTime();
  }
  if (!ispaused) {
    pauseButton.classList.toggle("hidden", !ispaused);
    resumeButton.classList.toggle("hidden", ispaused);
    user.pauseTime();
  }
}

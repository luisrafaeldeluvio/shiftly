import { user } from "./main";

const pauseButton = document.querySelector(
  ".ts-timer-pause",
) as HTMLButtonElement;
const resumeButton = document.querySelector(
  ".ts-timer-resume",
) as HTMLButtonElement;

export function toggleTimerControls(): void {
  if (user.isPaused) {
    pauseButton.classList.remove("hidden");
    resumeButton.classList.add("hidden");
    user.resumeTime();
  } else {
    pauseButton.classList.add("hidden");
    resumeButton.classList.remove("hidden");
    user.pauseTime();
  }
}

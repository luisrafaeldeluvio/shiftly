export function toggleTimer(): void {
  const pauseButton = document.querySelector(
    ".ts-timer-pause",
  ) as HTMLButtonElement;
  const resumeButton = document.querySelector(
    ".ts-timer-resume",
  ) as HTMLButtonElement;

  const ispaused: boolean = pauseButton.classList.contains("hidden");

  resumeButton.classList.toggle("hidden", ispaused);
  pauseButton.classList.toggle("hidden", !ispaused);
}

import { timer } from "../timer-entry";
import { refreshHistoryEntries } from "../update-history";
import { timerUIController } from "../timer-ui.ts";

export function handleStartClick(): void {
  if (timer.isRunning) return;
  timerUIController.toggle();
  timer.start();
}

export function handleStopClick(): void {
  if (!timer.isRunning) return;
  timerUIController.setDisplay("");
  timer.stop();
  refreshHistoryEntries();
  timerUIController.toggleControls();
  timerUIController.toggle();
}

export function toggleTimerStateUI(): void {
  timerUIController.toggleControls();
}

import { refreshHistoryEntries } from "../update-history";
import { timerUIController } from "../timer-ui.ts";

function isElementScrollableFinished(element: Element): boolean {
  if (
    Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) <=
    1
  ) {
    return true;
  } else {
    return false;
  }
}

export function handleCollapseOnScroll() {
  if (timerUIController.isTimerCollapsed) return;

  timerUIController.collapse();
}

export function handleLoadNewHistoryEntries(panel: Element) {
  if (!isElementScrollableFinished(panel)) return;
  refreshHistoryEntries(true);
}

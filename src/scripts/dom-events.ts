import { timer } from "./main";
import { refreshHistoryEntries } from "./update-history";
import { changeActivePanel } from "./changeActivePanel";
import { TimerUIController } from "./timer-ui.ts";
import { getNavItems } from "./helpers/get-nav-items.ts";

const timerUIController = new TimerUIController();

const startButton = document.querySelector(
  ".ts-timestart",
) as HTMLButtonElement;
const stopButton = document.querySelector(".ts-timestop") as HTMLButtonElement;
const timerDisplay = startButton.querySelector(
  ".ts-timer-display",
) as HTMLSpanElement;
const nav = document.querySelector(".nav > ul") as HTMLUListElement;

const historyPanel = document.querySelector(".history__container");
const toggleTimerPauseResume = document.querySelector(
  ".ts-timerpauseresume",
) as HTMLButtonElement;
let isTimerCollapsed: boolean = false;

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

function addControlButtonEventListener(): void {
  toggleTimerPauseResume.addEventListener("click", (): void => {
    timerUIController.toggleControls();
  });
}

function addStartButtonEventListener(): void {
  startButton.addEventListener(
    "click",
    (): void => {
      timerUIController.toggle();
      timer.start();
    },
    {
      once: true,
    },
  );
}

function addStopButtonEventListener(): void {
  stopButton.addEventListener("click", (): void => {
    timerDisplay.innerHTML = "";
    timer.stop();
    refreshHistoryEntries();
    timerUIController.toggle();
    addStartButtonEventListener();
  });
}

function addNavEventListener(): void {
  const navItems = getNavItems(nav);

  for (const itemId in navItems) {
    const navItem = document.querySelector(`#${itemId}`) as HTMLElement;

    navItem.addEventListener("click", () => {
      changeActivePanel(navItems[itemId]);
      for (const i in navItems) {
        const j = document.querySelector(`#${i}`) as HTMLElement;
        j.querySelector("span")?.classList.add("hidden");
      }
      navItem.querySelector("span")?.classList.remove("hidden");
      if (itemId === "navhistory" && isTimerCollapsed) {
        timerUIController.collapse();
        isTimerCollapsed = false;
      } else if (isTimerCollapsed) {
        return;
      } else {
        timerUIController.collapse();
        isTimerCollapsed = true;
      }
    });
  }
}

function addHistoryEventListener(): void {
  historyPanel?.addEventListener("scroll", () => {
    if (!isElementScrollableFinished(historyPanel)) return;
    console.log(true);

    refreshHistoryEntries(true);

    // BUG:
    //   after logging a new timer, the scroll stops working

    // isTimerCollapsed = false;
  });

  historyPanel?.addEventListener("scroll", () => {
    if (isTimerCollapsed) {
      return;
    } else {
      timerUIController.collapse();
      isTimerCollapsed = true;
    }
  });
}

export function initDomEvents(): void {
  addStartButtonEventListener();
  addStopButtonEventListener();
  addNavEventListener();
  addHistoryEventListener();
  addControlButtonEventListener();
}

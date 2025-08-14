import { timer } from "./main";
import { refreshHistoryEntries } from "./update-history";
import { changeActivePanel } from "./changeActivePanel";
import { toggleTimerCollapse } from "./collapseTimer";

const startButton = document.querySelector(
  ".ts-timestart",
) as HTMLButtonElement;
const stopButton = document.querySelector(".ts-timestop") as HTMLButtonElement;
const timerDisplay = startButton.querySelector(
  ".ts-timer-display",
) as HTMLSpanElement;
const controls = document.querySelector(".timer__controls") as HTMLDivElement;
const nav = document.querySelector(".nav > ul") as HTMLUListElement;
const panelsList = document.querySelectorAll(".panel");
const historyPanel = document.querySelector(".history__container");
const toggleTimerPauseResume = document.querySelector(
  ".ts-timerpauseresume",
) as HTMLButtonElement;

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

function getNavItems(navElement: HTMLElement) {
  const PanelsNavRecord: Record<string, string> = {};

  if (!navElement.childElementCount) return {};

  for (let i = 0; i < navElement.children.length; i++) {
    const item = navElement.children[i];
    PanelsNavRecord[item.id] = panelsList[i].id;
  }

  console.log(PanelsNavRecord);

  return PanelsNavRecord;
}

function toggleTimer(): void {
  const isActive = startButton.classList.contains("timer__start--active");

  startButton.classList.toggle("timer__start--active", !isActive);
  controls.classList.toggle("hidden", isActive);

  if (isActive) timerDisplay.textContent = "TIME IN";
}

function toggleTimerControlsIcon(): void {
  const timerPauseIcon = document.querySelector(
    ".ts-timer-pause-icon",
  ) as HTMLImageElement;
  const timerResumeIcon = document.querySelector(
    ".ts-timer-resume-icon",
  ) as HTMLImageElement;

  timerPauseIcon.classList.toggle("hidden");
  timerResumeIcon.classList.toggle("hidden");
}

function toggleTimerControls(): void {
  if (timer.isPaused) {
    timer.resume();
  } else {
    timer.pause();
  }

  toggleTimerControlsIcon();
}

function addControlButtonEventListener(): void {
  toggleTimerPauseResume.addEventListener("click", (): void => {
    toggleTimerControls();
  });
}

function addStartButtonEventListener(): void {
  startButton.addEventListener(
    "click",
    (): void => {
      toggleTimer();
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
    toggleTimer();

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
    });
  }
}
let isTimerCollapsed: boolean = false;
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
      toggleTimerCollapse();
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

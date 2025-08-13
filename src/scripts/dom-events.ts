import { timer } from "./main";
import { refreshHistoryEntries } from "./update-history";
// import { changeActivePanel } from "./changeActivePanel";
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

function toggleTimer(): void {
  const isActive = startButton.classList.contains("timer__start--active");

  startButton.classList.toggle("timer__start--active", !isActive);
  controls.classList.toggle("hidden", isActive);

  if (isActive) timerDisplay.textContent = "TIME IN";
}

function toggleTimerControls(): void {
  if (timer.isPaused) {
    timer.resume();
  } else {
    timer.pause();
  }
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

function getNavItems(navElement: HTMLElement): {} {
  const PanelsNavRecord: Record<string, string> = {};

  if (!navElement.childElementCount) return {};

  for (let i = 0; i < navElement.children.length; i++) {
    const item = navElement.children[i];
    PanelsNavRecord[item.id] = panelsList[i].id;
  }

  console.log(PanelsNavRecord);

  return PanelsNavRecord;
}

function addNavEventListener(): void {
  const navItems = getNavItems(nav);

  for (const itemId in navItems) {
    const navItem = document.querySelector(`#${itemId}`) as HTMLElement;

    navItem.addEventListener("click", () => {
      // changeActivePanel(PanelsNavRecord[item.id]);
      for (const i in navItems) {
        const j = document.querySelector(`#${i}`) as HTMLElement;
        j.querySelector("span")?.classList.add("hidden");
      }
      navItem.querySelector("span")?.classList.remove("hidden");
    });
  }
}

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

function addHistoryEventListener(): void {
  historyPanel?.addEventListener("scroll", () => {
    if (!isElementScrollableFinished(historyPanel)) return;

    refreshHistoryEntries(true);
    toggleTimerCollapse();
  });
}

export function initDomEvents(): void {
  addStartButtonEventListener();
  addStopButtonEventListener();
  addNavEventListener();
  addHistoryEventListener();
  addControlButtonEventListener();
}

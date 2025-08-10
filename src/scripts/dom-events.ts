import { timer } from "./main";
import { refreshHistoryEntries } from "./update-history";
// import { changeActivePanel } from "./changeActivePanel";

const startButton = document.querySelector(".ts-timein") as HTMLButtonElement;
const stopButton = document.querySelector(".ts-timeout") as HTMLButtonElement;
const timerCounter = startButton.querySelector(
  ".timer__counter",
) as HTMLSpanElement;
const controls = document.querySelector(".timer__controls") as HTMLDivElement;
const nav = document.querySelector(".nav > ul") as HTMLUListElement;
const panelsList = document.querySelectorAll(".panel");
const historyPanel = document.querySelector(".history__container");

function toggleTimer(): void {
  const isActive = startButton.classList.contains("timer__timein--active");

  startButton.classList.toggle("timer__timein--active", !isActive);
  controls.classList.toggle("hidden", isActive);

  timerCounter.textContent = isActive ? "TIME IN" : "00:00:00";
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
    const timerTimeinDisplay = document.querySelector(
      ".ts-timein-display",
    ) as HTMLParagraphElement;

    timerTimeinDisplay.innerHTML = "";
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
  });
}

export function initDomEvents(): void {
  addStartButtonEventListener();
  addStopButtonEventListener();
  addNavEventListener();
  addHistoryEventListener();
}

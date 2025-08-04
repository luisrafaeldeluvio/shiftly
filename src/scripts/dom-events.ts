import { timer } from "./main";
import { refreshHistoryEntries } from "./update-history";
import { updateNavSliderPosition } from "./updateNavSliderPosition";
import { changeActivePanel } from "./changeActivePanel";

const startButton = document.querySelector(".ts-timein") as HTMLButtonElement;
const stopButton = document.querySelector(".ts-timeout") as HTMLButtonElement;
const timerCounter = startButton.querySelector(
  ".timer__counter",
) as HTMLSpanElement;
const controls = document.querySelector(".timer__controls") as HTMLDivElement;
const nav = document.querySelector(".nav > ul") as HTMLUListElement;
const panelsList = document.querySelectorAll(".panel");
const historyPanel = document.querySelector(".history");

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

function addNavEventListener(): void {
  const PanelsNavRecord: Record<string, string> = {};

  for (let i = 0; i < nav.children.length; i++) {
    const item = nav.children[i];
    if (item.tagName === "DIV") continue;
    PanelsNavRecord[item.id] = panelsList[i].id;

    item.addEventListener("click", () => {
      updateNavSliderPosition(item.id);
      changeActivePanel(PanelsNavRecord[item.id]);
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

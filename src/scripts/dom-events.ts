import { getElement } from "./helpers/get-element.ts";
import * as timerControls from "./domEvents/timerControlButtons.ts";
import { handleNavClicks } from "./domEvents/nav.ts";
import * as historyPanelScroll from "./domEvents/historyPanel.ts";

const startButton = getElement(".ts-timestart");
const stopButton = getElement(".ts-timestop");
const toggleTimerPauseResume = getElement(".ts-timerpauseresume");
const historyPanel = getElement(".history__container");
const nav = getElement(".nav > ul") as HTMLUListElement;

export function initDOMEvents(): void {
  startButton.addEventListener("click", timerControls.handleStartClick);
  stopButton.addEventListener("click", timerControls.handleStopClick);
  toggleTimerPauseResume.addEventListener(
    "click",
    timerControls.toggleTimerStateUI,
  );

  Array.from(nav.children).forEach((elem) => {
    elem.addEventListener("click", () => handleNavClicks(elem));
  });
}

historyPanel.addEventListener("scroll", () =>
  historyPanelScroll.handleLoadNewHistoryEntries(historyPanel),
);
historyPanel.addEventListener(
  "scroll",
  historyPanelScroll.handleCollapseOnScroll,
);

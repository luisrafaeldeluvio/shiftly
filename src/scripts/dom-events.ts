import { timer } from "./main";
import { refreshHistoryEntries } from "./update-history";
import { updateNavSliderPosition } from "./updateNavSliderPosition";

const startButton = document.querySelector(".ts-timein") as HTMLButtonElement;
const stopButton = document.querySelector(".ts-timeout") as HTMLButtonElement;
const timerCounter = startButton.querySelector(
  ".timer__counter",
) as HTMLSpanElement;
const controls = document.querySelector(".timer__controls") as HTMLDivElement;
const nav = document.querySelector(".nav > ul") as HTMLUListElement;

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
  for (const item of nav.children) {
    if (item.tagName === "DIV") {
      continue;
    }
    item.addEventListener("click", () => {
      updateNavSliderPosition(item.id);
    });
  }
}

export function initDomEvents(): void {
  addStartButtonEventListener();
  addStopButtonEventListener();
  addNavEventListener();
}

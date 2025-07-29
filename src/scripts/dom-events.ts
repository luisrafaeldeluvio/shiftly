import { timer } from "./main";
import { refreshHistoryEntries } from "./update-history";

const startButton = document.querySelector(".ts-timein") as HTMLButtonElement;
const stopButton = document.querySelector(".ts-timeout") as HTMLButtonElement;
const timerCounter = startButton.querySelector(
  ".timer__counter",
) as HTMLSpanElement;
const controls = document.querySelector(".timer__controls") as HTMLDivElement;

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

function moveNavSlider(id: string): void {
  const nav = document.querySelector(".nav") as HTMLDivElement;
  const navList = nav.querySelector("ul") as HTMLUListElement;
  const navSlider = document.querySelector(".__slider") as HTMLDivElement;

  const listWidth: Record<string, number> = {};
  for (const item of navList.children) {
    if (item.tagName === "DIV") {
      continue;
    }

    listWidth[item.id] = item.clientWidth;
  }

  if (!(id in listWidth)) {
    throw new Error(`"${id}" not found in ${Object.keys(listWidth)}`);
  }

  const selectedElem = document.querySelector(`#${id}`) as HTMLElement;
  const calc =
    selectedElem.getBoundingClientRect().left -
    navList.getBoundingClientRect().left;

  navSlider.style.transform = `translateX(calc(${calc}px - 1.4rem))`;

  navSlider.style.width = `calc( ${listWidth[id]}px + 2.5rem)`;
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

moveNavSlider("navadd");
await sleep(1500);
moveNavSlider("navsettings");
await sleep(1500);
moveNavSlider("navstats");

export function initDomEvents(): void {
  addStartButtonEventListener();
  addStopButtonEventListener();
}

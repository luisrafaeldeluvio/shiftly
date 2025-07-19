import { user } from "./main";
import { toggleTimerControls } from "./toggleTimerControls";

const startButton = document.querySelector(".ts-timein") as HTMLButtonElement;
const stopButton = document.querySelector(".ts-timeout") as HTMLButtonElement;
const timerCounter = startButton.querySelector(
  ".timer__counter",
) as HTMLSpanElement;
const controls = document.querySelector(".timer__controls") as HTMLDivElement;
const timerControls: string[] = ["pause", "resume"];

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
      user.startTime();
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
    user.stopTime();
    toggleTimer();

    addStartButtonEventListener();
  });
}

function addControlButtonsEventListner(): void {
  for (const element of timerControls) {
    const elem = document.querySelector(
      `.timer__${element}`,
    ) as HTMLButtonElement;

    elem.addEventListener("click", (): void => {
      toggleTimerControls();
    });
  }
}

export function initDomEvents(): void {
  addStartButtonEventListener();
  addStopButtonEventListener();
  addControlButtonsEventListner();
}

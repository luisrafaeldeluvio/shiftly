import { timer } from "./main";

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
    toggleTimer();

    addStartButtonEventListener();
  });
}

export function initDomEvents(): void {
  addStartButtonEventListener();
  addStopButtonEventListener();
}

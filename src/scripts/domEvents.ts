import { user } from "./main";
import { toggleTimer } from "./toggleTimer";

export function initDomEvents(): void {
  const startButton = document.querySelector(".ts-timein") as HTMLButtonElement;
  const stopButton = document.querySelector(".ts-timeout") as HTMLButtonElement;
  const timerControls: string[] = ["pause", "resume"];

  function startTimein(): void {
    const timerCounter = startButton.querySelector(
      ".timer__counter",
    ) as HTMLSpanElement;
    const controls = document.querySelector(".timer__controls");
    const isActive = startButton.classList.contains("timer__timein--active");

    startButton.classList.toggle("timer__timein--active", !isActive);
    controls?.classList.toggle("hidden", isActive);

    if (timerCounter) {
      timerCounter.textContent = isActive ? "TIME IN" : "00:00:00";
      user.startTime();
    }
  }

  startButton.addEventListener("click", startTimein, {
    once: true,
  });

  for (const element of timerControls) {
    const elem = document.querySelector(
      `.timer__${element}`,
    ) as HTMLButtonElement;

    elem.addEventListener("click", (): void => {
      toggleTimer();
    });
  }

  stopButton.addEventListener("click", (): void => {
    user.stopTime();

    const timerCounter = startButton.querySelector(
      ".timer__counter",
    ) as HTMLSpanElement;
    const timerTimeinDisplay = document.querySelector(
      ".ts-timein-display",
    ) as HTMLParagraphElement;
    const controls = document.querySelector(".timer__controls");
    const isActive = startButton.classList.contains("timer__timein--active");

    startButton.classList.toggle("timer__timein--active", !isActive);
    controls?.classList.toggle("hidden", isActive);
    timerTimeinDisplay.innerHTML = "";

    startButton.addEventListener("click", startTimein, {
      once: true,
    });

    if (timerCounter) {
      timerCounter.textContent = isActive ? "TIME IN" : "00:00:00";
    }
  });
}

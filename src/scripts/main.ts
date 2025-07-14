"use strict";

import "../style/global.scss";
import "../style/main.scss";
import "../style/nav.scss";

const btn = document.querySelector<HTMLButtonElement>(".ts-clockin");

if (btn) {
  btn.addEventListener("click", (): void => {
    const txt = btn.querySelector<HTMLSpanElement>(".timer__counter");
    const controls = document.querySelector<HTMLElement>(".timer__controls");

    const isActive = btn.classList.contains("timer__clockin--active");
    btn.classList.toggle("timer__clockin--active", !isActive);
    controls?.classList.toggle("hidden", isActive);
    if (txt) {
      txt.textContent = isActive ? "Clock In" : "00:00:00";
    }
  });
}

function toggleTimer(): void {
  const pauseButton = document.querySelector(
    ".ts-timer-pause",
  ) as HTMLButtonElement;
  const resumeButton = document.querySelector(
    ".ts-timer-resume",
  ) as HTMLButtonElement;

  const ispaused: boolean = pauseButton.classList.contains("hidden");

  resumeButton.classList.toggle("hidden", ispaused);
  pauseButton.classList.toggle("hidden", !ispaused);
}

const timerControls: string[] = ["pause", "resume"];

for (const element of timerControls) {
  const elem = document.querySelector(
    `.timer__${element}`,
  ) as HTMLButtonElement;

  elem.addEventListener("click", (): void => {
    toggleTimer();
  });
}

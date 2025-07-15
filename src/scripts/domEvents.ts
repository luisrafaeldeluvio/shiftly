import { user } from "./main";
import { toggleTimer } from "./toggleTimer";

export function initDomEvents(): void {
  const btn = document.querySelector(".ts-timein") as HTMLButtonElement;
  const timerControls: string[] = ["pause", "resume"];

  btn.addEventListener("click", (): void => {
    const txt = btn.querySelector<HTMLSpanElement>(".timer__counter");
    const controls = document.querySelector<HTMLElement>(".timer__controls");

    const isActive = btn.classList.contains("timer__timein--active");
    btn.classList.toggle("timer__timein--active", !isActive);
    controls?.classList.toggle("hidden", isActive);
    if (txt) {
      txt.textContent = isActive ? "time In" : "00:00:00";
      user.startTime();
    }
  });

  for (const element of timerControls) {
    const elem = document.querySelector(
      `.timer__${element}`,
    ) as HTMLButtonElement;

    elem.addEventListener("click", (): void => {
      toggleTimer();
      console.log(user.elapsedTime(user.timein, Date.now()));
    });
  }
}

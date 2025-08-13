export function toggleTimerCollapse(): void {
  document
    .querySelector<HTMLDivElement>(".timer")
    ?.classList.toggle("timer--collapsed");
  document
    .querySelector<HTMLDivElement>(".timer__controls")
    ?.classList.toggle("timer__controls--collapsed");
  document
    .querySelector<HTMLButtonElement>(".ts-timestart")
    ?.classList.toggle("button--s");

  const stopTimerButton =
    document.querySelector<HTMLButtonElement>(".timer__stop");

  stopTimerButton?.querySelector("span")?.classList.toggle("hidden");
  stopTimerButton?.querySelector("img")?.classList.toggle("hidden");
}

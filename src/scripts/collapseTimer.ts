export function toggleTimerCollapse(): void {
  document
    .querySelector<HTMLDivElement>(".timer")
    ?.classList.add("timer--collapsed");
  // document
  //   .querySelector<HTMLButtonElement>(".ts-timein")
  //   ?.classList.remove("timer__timein--active");
  document
    .querySelector<HTMLDivElement>(".timer__controls")
    ?.classList.toggle("timer__controls--collapsed");
}

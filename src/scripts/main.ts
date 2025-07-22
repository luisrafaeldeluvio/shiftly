"use strict";

import "../style/global.scss";
import "../style/main.scss";
import "../style/nav.scss";

import { TimerEntry } from "./timer-entry";
import { initDomEvents } from "./dom-events";
import { formatElapsedTime } from "./format-date";
import { updateHistory } from "./update-history";

updateHistory();

const timer = new TimerEntry();

initDomEvents();

setInterval((): void => {
  if (timer.isRunning) {
    const timerCounterContainer = document.querySelector(".timer__counter");
    if (timerCounterContainer) {
      timerCounterContainer.innerHTML = `${formatElapsedTime(timer.elapsedTime)}`;
    }
  }
});

export { timer };

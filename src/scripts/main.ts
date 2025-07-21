"use strict";

import "../style/global.scss";
import "../style/main.scss";
import "../style/nav.scss";

import { TimerEntry } from "./timer-entry";
import { initDomEvents } from "./dom-events";

const timer = new TimerEntry();

initDomEvents();

setInterval((): void => {
  if (timer.isRunning) {
    const timerCounterContainer = document.querySelector(".timer__counter");
    if (timerCounterContainer) {
      timerCounterContainer.innerHTML = `${timer.elapsedTime}`;
    } else {
      console.log(false);
    }
  }

  console.log(timer.elapsedTime, timer.time);
}, 1000);

export { timer };

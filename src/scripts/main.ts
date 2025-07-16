"use strict";

import "../style/global.scss";
import "../style/main.scss";
import "../style/nav.scss";

import { TimeLog } from "./timeLog";
import { initDomEvents } from "./domEvents";
// import { formatDate } from "./time";

const user = new TimeLog({
  in: 0,
  out: 0,
});

// function stopTimer(): void {}

initDomEvents();

setInterval((): void => {
  if (user.isRunning && !user.isPaused) {
    const timerCounterContainer = document.querySelector(".timer__counter");
    if (timerCounterContainer) {
      timerCounterContainer.innerHTML = `${user.elapsedTime(user.timein)}`;
    } else {
      console.log(false);
    }
  }
});

export { user };

// Create a date function

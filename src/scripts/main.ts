"use strict";

import "../style/global.scss";
import "../style/main.scss";
import "../style/nav.scss";

import { TimeLog } from "./timeLog";
import { initDomEvents } from "./domEvents";
// import dayjs from "dayjs";

const user = new TimeLog({
  in: 0,
  out: 0,
});

initDomEvents();

setInterval((): void => {
  if (user.isRunning && !user.isPaused) {
    const timerCounterContainer = document.querySelector(".timer__counter");
    if (timerCounterContainer) {
      timerCounterContainer.innerHTML = `${user.elapsedTime()}`;
    } else {
      console.log(false);
    }
  }
});

export { user };

"use strict";

import "../style/global.scss";
import "../style/main.scss";
import "../style/nav.scss";

import { TimeLog } from "./timeLog";
import { initDomEvents } from "./domEvents";
// import { toggleTimer } from "./toggleTimer";

const user = new TimeLog({
  in: 0,
  out: 0,
});

// function stopTimer(): void {}

initDomEvents();

export { user };

// Create a date function

import { db } from "../db";
import { getElement } from "../helpers/get-element";
import { refreshHistoryEntries } from "../update-history";
import { changeActivePanel } from "../changeActivePanel";

const initialTimeInput = getElement(
  "#new-entry__initial-time",
) as HTMLInputElement;
const finalTimeInput = getElement("#new-entry__final-time") as HTMLInputElement;

const isInputInvalid = () => {
  return (
    !finalTimeInput.value ||
    !initialTimeInput.value ||
    finalTimeInput.valueAsNumber < initialTimeInput.valueAsNumber
  );
};

function handleNewTimerEntryError(): void {
  alert("There was an error, please try again.");
}

export function handleNewTimerEntry(): void {
  if (isInputInvalid()) return handleNewTimerEntryError();

  db.timerEntries
    .put({
      initialTime: initialTimeInput.valueAsNumber,
      finalTime: finalTimeInput.valueAsNumber,
      totalPause: 0,
    })
    .catch((e) => {
      console.error(e);
    });

  refreshHistoryEntries();
  changeActivePanel("panelhistory");
}

// TODO:
// add the error handling (classes)
// add style

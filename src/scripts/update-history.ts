import { db } from "./db";
import { formatElapsedTime } from "./helpers/format-date";
import { formatTime } from "./helpers/format-date";

const table = document.querySelector(".history__table") as HTMLTableElement;
const tableBody = table.tBodies[0];
let totalEntriesLoaded = 0;

interface TimerEntry {
  initialTime: number;
  finalTime: number;
  totalPause: number;
}

interface LoadHistory {
  sort?: "initialTime" | "finalTime" | "id";
  amount?: number;
  offset?: number;
}

function createRow(entry: TimerEntry) {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `
    <td>${formatTime("M/D/Y", entry.initialTime)}</td>
    <td>${formatTime("h:m", entry.initialTime)}</td>
    <td>${formatTime("h:m", entry.finalTime)}</td>
    <td>${formatElapsedTime(entry.finalTime - entry.initialTime - entry.totalPause)}</td>
  `;
  tableBody.append(tableRow);
}

export function loadHistoryEntries(params?: LoadHistory): void {
  db.timerEntries
    .orderBy(params?.sort ?? "id")
    .reverse()
    .offset(params?.offset ?? 0)
    .limit(params?.amount ?? 20)
    .toArray()
    .then((entries) => {
      entries.forEach((entry) => {
        createRow({
          initialTime: entry.initialTime,
          finalTime: entry.finalTime,
          totalPause: entry.totalPause,
        });
        totalEntriesLoaded++;
      });
    });
}

export function refreshHistoryEntries(offset: boolean = false) {
  if (!offset) {
    tableBody.innerHTML = "";
    loadHistoryEntries({
      offset: 0,
    });
  } else {
    loadHistoryEntries({
      offset: totalEntriesLoaded,
    });
  }
}

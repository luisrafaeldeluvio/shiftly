import { db } from "./db";
import { formatElapsedTime } from "./format-date";
import { formatTime } from "./format-date";

const table = document.querySelector(".history__table") as HTMLTableElement;
const tableBody = table.tBodies[0];

interface TimerEntry {
  initialTime: number;
  finalTime: number;
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
    <td>${formatTime("h:m:s", entry.initialTime)}</td>
    <td>${formatTime("h:m:s", entry.finalTime)}</td>
    <td>${formatElapsedTime(entry.finalTime - entry.initialTime)}</td>
  `;
  tableBody.append(tableRow);
}

export function loadHistoryEntries(params?: LoadHistory): void {
  db.timerEntries
    .reverse()
    .offset(params?.offset ?? 0)
    .limit(params?.amount ?? 20)
    .sortBy(params?.sort ?? "id")
    .then((entries) => {
      entries.forEach((entry) => {
        createRow({
          initialTime: entry.initialTime,
          finalTime: entry.finalTime,
        });
      });
    });
}

export function refreshHistoryEntries() {
  tableBody.innerHTML = "";
  loadHistoryEntries();
}

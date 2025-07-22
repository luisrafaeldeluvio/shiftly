import { db } from "./db";
import { formatElapsedTime } from "./format-date";

const table = document.querySelector(".history__table") as HTMLTableElement;
const tableBody = table.querySelector("tbody") as HTMLTableSectionElement;

interface TimerEntriesTime {
  initialTime: number;
  finalTime: number;
}

function createRow(entry: TimerEntriesTime) {
  const tableRow = document.createElement("tr");
  const data: string[] = [
    new Date(entry.initialTime).toString(),
    entry.initialTime.toString(),
    entry.finalTime.toString(),
    formatElapsedTime(entry.finalTime - entry.initialTime),
  ];
  for (let i of data) {
    const tableData = document.createElement("td");
    tableData.innerText = i;
    tableRow.appendChild(tableData);
  }

  tableBody.appendChild(tableRow);
}

export async function updateHistory() {
  if (!tableBody.hasChildNodes()) {
    db.timerEntries.each((entry) => {
      createRow({ initialTime: entry.initialTime, finalTime: entry.finalTime });
    });
  } else if (tableBody.hasChildNodes()) {
    const x = await db.timerEntries.orderBy("id").last();
    console.log(x);
  }

  //   check if table body is empty
  //   if true, load all the entries
  //   if not check the last entry in the table
  //   if it matches the db, return
  //   if not load the entries starting from the last entry on the table + 1
}

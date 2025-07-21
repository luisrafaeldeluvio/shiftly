import Dexie, { type EntityTable } from "dexie";

interface TimerEntryEntity {
  id: number;
  initialTime: number;
  finalTime: number;
}

export const db = new Dexie("time") as Dexie & {
  timerEntries: EntityTable<TimerEntryEntity, "id">;
};

db.version(1).stores({
  timerEntries: "++id,initialTime,finalTime",
});

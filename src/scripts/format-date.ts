export function formatElapsedTime(elapsedTime: number): string {
  const elapsedTimeInSeconds = elapsedTime / 1000;
  const seconds = Math.round(elapsedTimeInSeconds % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(elapsedTimeInSeconds / 3600)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

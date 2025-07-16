export function formatDate(DATE: Date | number): string {
  const date = new Date(DATE);
  const pad = (num: number) => num.toString().padStart(2, "0");

  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${day}/${month} ${hours}:${minutes}:${seconds}`;
}

export function formatTimer() {}

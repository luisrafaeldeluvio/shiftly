function padTwoDigits(num: number): string {
  return num.toString().padStart(2, "0");
}

const formatTable: Record<string, (date: Date) => number> = {
  M: (date) => date.getMonth() + 1,
  D: (date) => date.getDate(),
  Y: (date) => date.getFullYear(),
  h: (date) => date.getHours(),
  m: (date) => date.getMinutes(),
  s: (date) => date.getSeconds(),
};

function formatCharacter(char: string, date: Date): string {
  return char in formatTable ? padTwoDigits(formatTable[char](date)) : char;
}

export function formatTime(formatPattern: string, timestamp: number): string {
  const date = new Date(timestamp);

  return [...formatPattern]
    .map((char): string => formatCharacter(char, date))
    .join("");
}

export function formatElapsedTime(elapsedTime: number): string {
  const elapsedTimeInSeconds = elapsedTime / 1000;
  const seconds = padTwoDigits(Math.round(elapsedTimeInSeconds % 60));
  const minutes = padTwoDigits(Math.floor((elapsedTimeInSeconds % 3600) / 60));
  const hours = padTwoDigits(Math.floor(elapsedTimeInSeconds / 3600));

  return `${hours}:${minutes}:${seconds}`;
}

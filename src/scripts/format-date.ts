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

export function formatTime(format: string, dates: number): string {
  const date = new Date(dates);
  let formattedDate: any[] = [];
  console.log(date);

  for (let i = 0; i < format.length; i++) {
    switch (format[i]) {
      case "M":
        formattedDate.push(date.getMonth().toString().padStart(2, "0"));
        break;
      case "D":
        formattedDate.push(date.getDate().toString().padStart(2, "0"));
        break;
      case "Y":
        formattedDate.push(date.getFullYear().toString().padStart(2, "0"));
        break;
      case "H":
        formattedDate.push(date.getHours().toString().padStart(2, "0"));
        break;
      case "M":
        formattedDate.push(date.getMinutes().toString().padStart(2, "0"));
        break;
      case "S":
        formattedDate.push(date.getSeconds().toString().padStart(2, "0"));
        break;
      default:
        formattedDate.push(format[i]);
        break;
    }
  }

  return formattedDate.join("").toString();
}

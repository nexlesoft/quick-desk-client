export function padZero(num: number): string {
  return num < 10 ? "0" + num : num.toString();
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours()); // 24-hour format
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}_${month}_${day}_${hours}${minutes}${seconds}`;
}

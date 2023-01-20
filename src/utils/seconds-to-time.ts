export default function secondsToTime(seconds: number): string {
  const zeroLeft = (n:number) => Math.floor(n).toString().padStart(2, '0');
  const hour = zeroLeft(seconds / 3600);
  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);
  return `${hour}:${min}:${sec}`;
}

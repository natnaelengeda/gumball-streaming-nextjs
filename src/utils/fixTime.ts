export const fixTime = (time: string) => {
  const newTime = time.split(":");
  return `${newTime[1]}:${newTime[2]}`;
}
export function getDateNumeric(timestamp: string) {
  return new Date(timestamp).toLocaleString().split(",")[0];
}

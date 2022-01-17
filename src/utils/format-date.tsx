export function getDateNumeric(timestamp: string): string {
  return new Date(timestamp).toLocaleString().split(",")[0];
}

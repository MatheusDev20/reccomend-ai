export const timeout = (t: number) =>
  new Promise((resolve) => setTimeout(resolve, t));

export function formatDate(dateString: string, onlyYear = false): string {
  try {
    const [year, month, day] = dateString.split('-');
    return onlyYear && year ? year : `${day}/${month}/${year}`;
  } catch (err) {
    return 'N/A';
  }
}

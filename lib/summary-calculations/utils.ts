export const toPercentage = (value: number, total: number) => {
  if (!total) return 0;
  return (value / total) * 100;
};

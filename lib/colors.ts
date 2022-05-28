export const getBgColor = (number) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ] as const;

  let index = number - 1;
  if (index > colors.length) {
    index %= colors.length;
  }

  return colors[index];
};

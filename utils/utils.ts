export const getDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number
): number => {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  return originalPrice - discountAmount;
};

export const formatNumberWithCommas = (number: number): string => {
  return number.toLocaleString("en-IN");
};

export const capitalizeWords = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

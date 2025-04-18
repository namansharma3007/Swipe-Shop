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

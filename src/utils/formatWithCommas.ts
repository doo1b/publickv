export const formatWithCommas = (value: number | string | undefined) => {
  return value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

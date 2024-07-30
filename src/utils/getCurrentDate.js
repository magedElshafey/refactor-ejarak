export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  // Formatting month and day to have leading zeros if needed
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  // Concatenating year, month, and day with dashes
  return `${year}-${formattedMonth}-${formattedDay}`;
};

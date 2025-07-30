const prefixWithZero = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

const dateTimeFormate = (date) => {
  return `${date?.getFullYear()}-${prefixWithZero(
    date?.getMonth() + 1
  )}-${prefixWithZero(date?.getDate())} ${prefixWithZero(
    date?.getUTCHours()
  )}:${prefixWithZero(date?.getUTCMinutes())}:${prefixWithZero(
    date?.getUTCSeconds()
  )}`;
};

export default dateTimeFormate;

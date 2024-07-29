export const getParse = (v) => {
  if (localStorage.getItem(v)) {
    JSON.parse(localStorage.getItem(v));
  } else {
    return null;
  }
};

export const initializeOptions = (arr) => {
  const newArray = new Array(arr.length).fill(false);
  return newArray;
};

export const initializeOptionsWidth = (arr) => {
  return arr.map((col) => col.width);
};

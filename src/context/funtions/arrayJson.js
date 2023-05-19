export const arrayJson = (array, key) => {
  let tempArrayValues = [];
  for (let i = 0; i < array.length; i++) {
    let tempValue = array[i][key];
    let found = false;
    for (let j = 0; j < tempArrayValues.length; j++) {
      if (tempValue === tempArrayValues[j]) {
        found = true;
      }
    }
    if (!found) {
      tempArrayValues.push(tempValue);
    }
  }
  return tempArrayValues;
};

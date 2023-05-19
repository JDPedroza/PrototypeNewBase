var randomHexColor = require("random-hex-color");

export const findDuplicateAttributes = (arr, columns) => {
  let duplicateAttributes = [];

  arr.forEach((obj, index) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const isNotArray = !Array.isArray(value);
      const isNotObject = typeof value !== "object";
      const isNotBoolean = typeof value !== "boolean";
      const isNotExeption =
        columns.find((e) => e.id === key) !== undefined
          ? columns.find((e) => e.id === key).print
          : false;

      const isNonEmptyNumber = typeof value === "number" && value !== 0;
      const isNonEmptyString = typeof value === "string" && value.trim() !== "";

      if (isNotArray && isNotObject && isNotBoolean && isNotExeption) {
        if (isNonEmptyString || isNonEmptyNumber) {
          const duplicates = arr.filter(
            (o, i) => i !== index && o[key] === value
          );
          if (
            duplicates.length > 0 &&
            !duplicateAttributes.some((e) => e.attribute === key)
          ) {
            duplicateAttributes.push({
              attribute: key,
              label: columns.find((e) => e.id === key).label,
            });
          }
        }
      }
    });
  });

  console.log(duplicateAttributes);

  return duplicateAttributes;
};

export const generateData = (arr, attr) => {
  let result = {
    quantity: {},
    quantity_percentage: {},
    amount: {},
    amount_percentage: {},
    quantity_total: 0,
    amount_total: 0,
    key_primary: [],
    quantity_clients: {},
    amount_clients: {},
    key_secundary: [],
  };

  // Loop to count duplicates and calculate total amount
  arr.forEach((obj) => {
    let value = obj[attr];
    if (value !== undefined && value !== "" && value !== null && value !== 0) {
      if (!result.quantity[value]) {
        result.quantity[value] = 1;
      } else {
        result.quantity[value]++;
      }
      if (!result.amount[value]) {
        result.amount[value] = obj.amount;
      } else {
        result.amount[value] += obj.amount;
      }
      if (!result.quantity_clients[obj.nameHolder1]) {
        result.quantity_clients[obj.nameHolder1] = 1;
      } else {
        result.quantity_clients[obj.nameHolder1]++;
      }
      if (!result.amount_clients[obj.nameHolder1]) {
        result.amount_clients[obj.nameHolder1] = obj.amount;
      } else {
        result.amount_clients[obj.nameHolder1] += obj.amount;
      }
      result.quantity_total++;
      result.amount_total += obj.amount;
    }
  });

  // Calculate percentages
  for (let key in result.quantity) {
    result.quantity_percentage[key] =
      (result.quantity[key] / result.quantity_total) * 100;
    result.quantity_percentage[key] =
      result.quantity_percentage[key].toFixed(2);
  }
  for (let key in result.amount) {
    result.amount_percentage[key] =
      (result.amount[key] / result.amount_total) * 100;
    result.amount_percentage[key] = result.amount_percentage[key].toFixed(2);
  }

  // Create secondary key array
  result.key_primary = Object.keys(result.quantity);
  result.key_secundary = result.key_primary.map((key) => {
    return arr.filter((obj) => obj[attr] === key).map((obj) => obj.nameHolder1);
  });

  //colors
  let colorsPrimary = result.key_primary.map(() => {
    return randomHexColor();
  });

  let colorsSecundary = result.key_secundary
    .reduce((acc, curr) => acc.concat(curr), [])
    .map(() => {
      return randomHexColor();
    });

  return {
	result,
    colorsPrimary,
    colorsSecundary,
    bar: {
      quantity: result.quantity,
      amount: result.amount,
      keys: result.key_primary,
    },
    stacked: {
      quantity: result.quantity_clients,
      amount: result.amount_clients,
      groups: result.key_secundary,
      keys: result.key_secundary.reduce((acc, curr) => acc.concat(curr), []),
    },
    pie: {
      quantity: result.quantity_percentage,
      amount: result.amount_percentage,
      keys: result.key_primary,
    },
    donut: {
      quantity: result.quantity_percentage,
      amount: result.amount_percentage,
      keys: result.key_primary,
      title: { quantity: result.quantity_total, amount: result.amount_total },
    },
  };
};

function sortKeysDesc(keys, json) {
	keys.sort(function(a, b) {
	  return json[b] - json[a];
	});
	return keys;
  }
  

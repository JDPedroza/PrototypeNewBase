export async function filterMultiple(
  filings,
  selectedFilters,
  columns,
  arrayFilters
) {
  const promise = await Promise.all(
    filings.map((filing) => {
      filing.visible = true;
      let tempArrayValuesColors = [];
      if (filing.tags.length === 0) {
        tempArrayValuesColors.push(["white"]);
      } else {
        let tempArrayArrayValues = filing.tags.map((tag) => {
          return tag.color;
        });
        tempArrayValuesColors.push(tempArrayArrayValues);
      }
      let foundColor = false;
      for (let i = 0; i < tempArrayValuesColors.length; i++) {
        for (let j = 0; j < tempArrayValuesColors[i].length; j++) {
          if (selectedFilters[0].includes(tempArrayValuesColors[i][j])) {
            foundColor = true;
          }
        }
      }

      if (foundColor) {
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].filter) {
            if (columns[i].type !== "date") {
              if (!selectedFilters[i].includes(filing[columns[i].id])) {
                filing.visible = false;
                console.log(`desactivado por ${columns[i].id}`);
                break;
              }
            } else {
              let visible = activeDate(
                filing[columns[i].id],
                selectedFilters[i],
                arrayFilters[i]
              );
              if (!visible) {
                filing.visible = false;
                console.log(`desactivado por ${columns[i].id}`);
                break;
              }
            }
          }
        }
      } else {
        console.log(`desactivado por tag`);
        filing.visible = false;
      }

      return filing;
    })
  );
  return promise;
}

function activeDate(value, jsonSelects, jsonValues) {
  let foundDate = false;
  //recorremos los attributos
  console.log({
    value,
    jsonSelects,
    jsonValues,
  });
  if (value !== "") {
    let options = {};
    for (let attribute in jsonValues) {
      let tempValues = [];
      //recorremos los arrays del attribute
      for (
        let iYear = 0;
        iYear < jsonSelects[`${attribute}Selects`].length;
        iYear++
      ) {
        if (attribute === "years") {
          if (jsonSelects[`${attribute}Selects`][iYear]) {
            tempValues.push(jsonValues[attribute][iYear]);
          }
        } else {
          for (
            let iMonth = 0;
            iMonth < jsonSelects[`${attribute}Selects`][iYear].length;
            iMonth++
          ) {
            if (attribute === "months") {
              if (jsonSelects[`${attribute}Selects`][iYear][iMonth]) {
                tempValues.push(jsonValues[attribute][iYear][iMonth]);
              }
            } else {
              for (
                let iDay = 0;
                iDay < jsonSelects[`${attribute}Selects`][iYear][iMonth].length;
                iDay++
              ) {
                if (jsonSelects[`${attribute}Selects`][iYear][iMonth][iDay]) {
                  tempValues.push(jsonValues[attribute][iYear][iMonth][iDay]);
                }
              }
            }
          }
        }
      }
      options[attribute] = tempValues;
    }
    let arrayDate = value.split("/");
    if (
      options.years.includes(arrayDate[2]) &&
      options.months.includes(arrayDate[0]) &&
      options.days.includes(arrayDate[1])
    ) {
      return !foundDate;
    }
  } else if (jsonSelects.emply) {
    return !foundDate;
  }
  return foundDate;
}

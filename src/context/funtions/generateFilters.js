import { arrayJson } from "./arrayJson";

export const generateFilters = (columns, dataFilings, dataTags) => {
  let tempArrayFilters = [];
  let tempArraySelectedFilters = [];
  let tempFilterColumns = [];
  let tempArrayOpennedFilters = [];
  let tempActivesFilters = [];
  for (let i = 0; i < columns.length; i++) {
    if (i === 0) {
      let tempArrayColors = arrayJson(dataTags.tags, "color");
      tempArrayColors.unshift("white");
      tempArrayFilters.push(tempArrayColors);
      tempArraySelectedFilters.push(tempArrayColors);
      tempArrayOpennedFilters.push(null);
      tempActivesFilters.push(null);
    } else {
      if (columns[i].type === "date") {
        let arrayText = arrayJson(dataFilings, columns[i].id).sort();
        let arrayDates = arrayText
          .map((text) => {
            return { text, date: new Date(text) };
          })
          .sort((a, b) => b.date - a.date)
          .filter((c) => c.text !== "");
        let years = [];
        let yearsSelects = [];
        let yearsOpen = [];
        let yearsActives = [];
        let months = [];
        let monthsSelects = [];
        let monthsOpen = [];
        let monthsActives = [];
        let days = [];
        let daysSelects = [];
        let daysActives = [];
        for (let i = 0; i < arrayDates.length; i++) {
          if (arrayDates[i].text !== undefined) {
            let arrayDate = arrayDates[i].text.split("/");
            let indexYear = null;
            let indexMonth = null;
            if (years.includes(arrayDate[2])) {
              indexYear = years.findIndex((e) => e === arrayDate[2]);
            } else {
              indexYear = years.length;
              years.push(arrayDate[2]);
              yearsActives.push(true);
              yearsSelects.push(true);
              yearsOpen.push(false);
              months.push([]);
              monthsSelects.push([]);
              monthsActives.push([]);
              monthsOpen.push([]);
              days.push([]);
              daysSelects.push([]);
              daysActives.push([]);
            }

            if (months[indexYear].includes(arrayDate[0])) {
              indexMonth = months[indexYear].findIndex(
                (e) => e === arrayDate[0]
              );
            } else {
              indexMonth = months[indexYear].length;
              months[indexYear].push(arrayDate[0]);
              monthsSelects[indexYear].push(true);
              monthsActives[indexYear].push(true);
              monthsOpen[indexYear].push(false);
              days[indexYear].push([]);
              daysSelects[indexYear].push([]);
              daysActives[indexYear].push([]);
            }
            if (!days[indexYear][indexMonth].includes(arrayDate[1])) {
              days[indexYear][indexMonth].push(arrayDate[1]);
              daysSelects[indexYear][indexMonth].push(true);
              daysActives[indexYear][indexMonth].push(true);
            }
          }
        }

        tempArrayFilters.push({
          years,
          months,
          days,
        });
        tempArraySelectedFilters.push({
          emply: true,
          yearsSelects,
          monthsSelects,
          daysSelects,
        });
        tempArrayOpennedFilters.push({
          yearsOpen,
          monthsOpen,
        });
        tempActivesFilters.push({
          yearsActives,
          monthsActives,
          daysActives,
        });
      } else {
        let tempArray = arrayJson(dataFilings, columns[i].id).sort();
        tempArrayFilters.push(tempArray);
        tempArraySelectedFilters.push(tempArray);
        tempArrayOpennedFilters.push(null);
        let tempActivesFilter = new Array(tempArray.length);
        tempActivesFilter.fill(false);
        tempActivesFilters.push(tempActivesFilter);
      }
    }
    tempFilterColumns.push(0);
  }
  return {
    arrayFilters: tempArrayFilters,
    selectedFilters: tempArraySelectedFilters,
    filterColumns: tempFilterColumns,
    activesFilters: tempActivesFilters,
    opennedFilters: tempArrayOpennedFilters,
  };
};

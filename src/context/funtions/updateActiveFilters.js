export async function updateActiveFilters(data) {
  const { dataFilings, key, currentFilter } = data;
  let activeFilters = [];

  if (!key.includes("date")) {
    let tempArrayValues = [];
    //recorremos todos los json filings generando los valores nuevos
    for (let i = 0; i < dataFilings.length; i++) {
      //si el visible es decir no esta filtrado
      if (dataFilings[i].visible) {
        //agrego el valor si no se ha agregado a la lista
        if (!tempArrayValues.some((e) => e === dataFilings[i][key])) {
          tempArrayValues.push(dataFilings[i][key]);
        }
      }
    }
    //recorro todos los filtros activos y generamos el active
    for (let i = 0; i < currentFilter.length; i++) {
      activeFilters.push(true);
    }
    //recorremos todos los valores desactivando los valores encontrados
    for (let i = 0; i < tempArrayValues.length; i++) {
      let index = currentFilter.indexOf(tempArrayValues[i]);
      activeFilters[index] = false;
    }
  } else {
    let tempArrayValues = [];
    for (let i = 0; i < dataFilings.length; i++) {
      //si el visible es decir no esta filtrado
      if (dataFilings[i].visible) {
        //agrego el valor si no se ha agregado a la lista
        if (!tempArrayValues.some((e) => e === dataFilings[i][key])) {
          tempArrayValues.push(dataFilings[i][key]);
        }
      }
    }
    let endActiveFilter = {};
    for (const attribute in currentFilter) {
      endActiveFilter[`${attribute}Actives`] = currentFilter[attribute];
    }
    endActiveFilter = await resetDate(endActiveFilter);
    activeFilters = endActiveFilter;
  }
  return activeFilters;
}

function resetDate(currentFilter) {
  return new Promise((resolve, reject) => {
    for (let iYear = 0; iYear < currentFilter.yearsActives.length; iYear++) {
      currentFilter.yearsActives[iYear] = false;
      for (
        let iMonth = 0;
        iMonth < currentFilter.monthsActives[iYear].length;
        iMonth++
      ) {
        currentFilter.monthsActives[iYear][iMonth] = false;
        for (
          let iDay = 0;
          iDay < currentFilter.daysActives[iYear][iMonth].length;
          iDay++
        ) {
          currentFilter.daysActives[iYear][iMonth][iDay] = false;
        }
      }
    }
    resolve(currentFilter);
  });
}

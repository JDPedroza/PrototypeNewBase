import { useContext, useReducer } from "react";

//context
import FilterDateContext from "./FilterDateContext";
import FilterDateReducer from "./FilterDateReducer";

import RealEstateContext from "../realEstate/RealEstateContext";

const FilterDateState = (props) => {
  const { filterDate } = useContext(RealEstateContext);

  const initialState = {
    dataFilter: { years: [], months: [], days: [] },
    dataOpen: { yearsOpen: [], monthsOpen: [] },
    dataSelect: {
      yearsSelects: [],
      monthsSelects: [],
      daysSelects: [],
      emply: false,
    },
    dataActives: {
      years: [],
      months: [],
      days: [],
    },
    change: false,
    idx: null,
  };

  const [state, dispatch] = useReducer(FilterDateReducer, initialState);

  const setData = (data) => {
    dispatch({
      type: "SET_DATA_FILTER_DATE",
      payload: data,
    });
  };

  const getSelect = (type, idxYear, idxMonth, idxDay) => {
    switch (type) {
      case "yearsSelects":
        return state.dataSelect[type][idxYear];

      case "monthsSelects":
        return state.dataSelect[type][idxYear][idxMonth];

      case "daysSelects":
        return state.dataSelect[type][idxYear][idxMonth][idxDay];

      case "emply":
        return state.dataSelect[type];

      default:
        break;
    }
  };

  const getOpen = (type, idxYear, idxMonth) => {
    switch (type) {
      case "yearsOpen":
        return state.dataOpen[type][idxYear];

      case "monthsOpen":
        return state.dataOpen[type][idxYear][idxMonth];

      default:
        break;
    }
  };

  const handleToggleOpen = (type, value, idxYear, idxMonth) => {
    let tempDataOpen = state.dataOpen;

    if (type === "yearsOpen") {
      tempDataOpen[type][idxYear] = value;
    } else if (type === "monthsOpen") {
      tempDataOpen[type][idxYear][idxMonth] = value;
    }
  };

  const handleToggleSelect = (type, value, idxYear, idxMonth, idxDay) => {
    let tempDataSelect = state.dataSelect;
    if (type === "yearsSelects") {
      tempDataSelect[type][idxYear] = value;
      //recorremos todos los valores internos MESES para cambiar
      for (
        let idxForMonth = 0;
        idxForMonth < tempDataSelect.monthsSelects[idxYear].length;
        idxForMonth++
      ) {
        tempDataSelect.monthsSelects[idxYear][idxForMonth] = value;
        //recorremos todos los valores internos DIAS para cambiar
        for (
          let idxForDay = 0;
          idxForDay < tempDataSelect.daysSelects[idxYear][idxForMonth].length;
          idxForDay++
        ) {
          tempDataSelect.daysSelects[idxYear][idxForMonth][idxForDay] = value;
        }
      }
    } else if (type === "monthsSelects") {
      tempDataSelect[type][idxYear][idxMonth] = value;
      for (
        let idxForDay = 0;
        idxForDay < tempDataSelect.daysSelects[idxYear][idxMonth].length;
        idxForDay++
      ) {
        tempDataSelect.daysSelects[idxYear][idxMonth][idxForDay] = value;
      }
      if (value) {
        tempDataSelect.yearsSelects[idxYear] = true;
      }
    } else if (type === "daysSelects") {
      tempDataSelect[type][idxYear][idxMonth][idxDay] = value;
      if (value) {
        tempDataSelect.yearsSelects[idxYear] = true;
        tempDataSelect.monthsSelects[idxYear][idxMonth] = true;
      }
    } else if (type === "emply") {
      tempDataSelect[type] = value;
    }
    filterDate(state.idx, tempDataSelect);
  };

  return (
    <FilterDateContext.Provider
      value={{
        ...state,
        setData,
        getSelect,
        getOpen,
        handleToggleOpen,
        handleToggleSelect,
      }}
    >
      {props.children}
    </FilterDateContext.Provider>
  );
};

export default FilterDateState;

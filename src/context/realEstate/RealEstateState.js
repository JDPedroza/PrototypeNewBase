import { useReducer } from "react";

//guides
import { columnsAVVillas, columnsBBVA } from "../../data/columns";

//functions
import { generateFilters } from "../funtions/generateFilters";
import { updateActiveFilters } from "../funtions/updateActiveFilters";
import { filterMultiple } from "../funtions/filterMultiple";
import {
  initializeOptions,
  initializeOptionsWidth,
} from "../funtions/initializeOptions";
import {
  findDuplicateAttributes,
  generateData,
} from "../funtions/generateChart";

//context
import RealEstateContext from "./RealEstateContext";
import RealEstateReducer from "./RealEstateReducer";

//example
import {
  dataFilingsAVVillas,
  dataTagsAVVillas,
  configUserAVVillas,
  dataFilingsBBVA,
  configUserBBVA,
} from "../../data/dataExample";

const RealEstateState = (props) => {
  const initialState = {
    loading: true,
    filings: [],
    selects: [],
    columns: [],
    widthColumns: [],
    hiddenColumns: [],
    amount: 0,
    reload: false,
    filing: {},
    openForm: false,
    openTags: false,
    openChangeState: false,
    openSeeHiddenColumns: false,
    openCharts: false,
    openOptionsChart: false,
    optionsChart: [],
    dataCharts: {},
    filterColumns: [],
    activesFilters: [], //containe values to search
    selectedFilters: [], //containe values select
    arrayFilters: [], //containe arrays for columns
    bank: "",
    widthObservations: 350,
  };

  const [state, dispatch] = useReducer(RealEstateReducer, initialState);

  //initialice base
  const getFilings = (bank) => {
    dispatch({ type: "SET_LOADING", payload: true });

    let tempDataFilings,
      tempDataTags,
      tempDataConfig,
      tempDataColumns = null;

    if (bank === "FilingsAVVillas") {
      tempDataFilings = dataFilingsAVVillas;
      tempDataColumns = columnsAVVillas;
      tempDataTags = dataTagsAVVillas;
      tempDataConfig = configUserAVVillas;
    }else if(bank === "FilingsBBVA"){
		tempDataFilings = dataFilingsBBVA;
		tempDataColumns = columnsBBVA;
		tempDataTags = dataTagsAVVillas; //temporal
		tempDataConfig = configUserBBVA;
	}

    //aqui hacemos la configuracion de la base

    for (let j = 0; j < tempDataColumns.length; j++) {
      if (tempDataColumns[j].type === "date") {
        for (let i = 0; i < tempDataFilings.length; i++) {
          if (
            tempDataFilings[i][tempDataColumns[j].id] === undefined ||
            tempDataFilings[i][tempDataColumns[j].id] === ""
          ) {
            tempDataFilings[i][tempDataColumns[j].id] = "";
          }
        }
      }
    }

    //relizamos todo el proceso de carga
    let tempHiddenColumns =
      tempDataConfig.hiddens !== null
        ? tempDataConfig.hiddens
        : initializeOptions(tempDataColumns);

    let tempPinUPColumns =
      tempDataConfig.pinups !== null
        ? tempDataConfig.pinups
        : initializeOptions(tempDataColumns);

    let tempWidthObservations =
      tempDataConfig.widthObservations !== null
        ? tempDataConfig.widthObservations
        : 350;

    let tempWidthColumns =
      tempDataConfig.widths !== null
        ? tempDataConfig.widths
        : initializeOptionsWidth(tempDataColumns);

    dispatch({
      type: "SET_WIDTH_OBSERVATIONS",
      payload: tempWidthObservations,
    });
    dispatch({ type: "SET_PINUP", payload: tempPinUPColumns });
    dispatch({ type: "SET_HIDDEN_COLUMNS", payload: tempHiddenColumns });
    dispatch({ type: "SET_WIDTH_COLUMNS", payload: tempWidthColumns });
    dispatch({ type: "SET_BANK", payload: bank });
    dispatch({
      type: "SET_FILTERS_DATA",
      payload: generateFilters(tempDataColumns, tempDataFilings, tempDataTags),
    });
    dispatch({ type: "SET_FILINGS", payload: tempDataFilings });
    dispatch({ type: "SET_COLUMNS", payload: tempDataColumns });
    dispatch({ type: "SET_LOADING", payload: false });
  };

  //seleccion
  const handleSelected = (select, data) => {
    let tempSelect = state.selects;
    let tempAmount = state.amount;
    if (!select) {
      let index = state.selects.findIndex((element) => element.id === data.id);
      tempAmount = state.amount - parseInt(state.selects[index].amount);
      tempSelect.splice(index, 1);
    } else {
      tempAmount = state.amount + parseInt(data.amount);
      tempSelect.push(data);
    }
    dispatch({ type: "SET_AMOUNT", payload: tempAmount });
    dispatch({ type: "SET_SELECTS", payload: tempSelect });
  };

  const handleSelectedAll = (boolean) => {
    let tempFilings = state.filings;
    let tempSelect = [];
    let tempAmount = 0;
    if (boolean) {
      for (let i = 0; i < tempFilings.length; i++) {
        if (tempFilings[i].visible) {
          tempFilings[i].selected = boolean;
          tempAmount += parseInt(tempFilings[i].amount);
          tempSelect.push(tempFilings[i]);
        }
      }
    } else {
      for (let i = 0; i < tempFilings.length; i++) {
        if (tempFilings[i].visible) {
          tempFilings[i].selected = boolean;
        }
      }
    }
    dispatch({ type: "SET_AMOUNT", payload: tempAmount });
    dispatch({ type: "SET_SELECTS", payload: tempSelect });
    dispatch({ type: "SET_FILINGS", payload: tempFilings });
    dispatch({ type: "SET_RELOAD", payload: !state.reload });
  };

  //config
  const handleSetWidthObservation = (data) => {
    dispatch({
      type: "SET_WIDTH_OBSERVATIONS",
      payload: data,
    });
  };

  //actualización
  const handleUpdate = (idx, data) => {
    console.log(idx);
    console.log(data);
  };

  const handleOpenFilingEdit = (idx) => {
    dispatch({ type: "SET_FILING", payload: state.filings[idx] });
    handleOpenForm();
  };

  //opens
  const handleOpenForm = () => {
    if (state.openForm) {
      dispatch({ type: "SET_FILING", payload: {} });
    }
    dispatch({ type: "SET_OPEN_FORM", payload: !state.openForm });
  };

  const handleOpenTags = () => {
    dispatch({ type: "SET_OPEN_TAGS", payload: !state.openTags });
  };

  const handleOpenChangeStates = () => {
    dispatch({
      type: "SET_OPEN_CHANGE_STATE",
      payload: !state.openChangeState,
    });
  };

  const handleOpenSeeHiddenColumns = () => {
    dispatch({
      type: "SET_OPEN_SEE_HIDDEN_COLUMNS",
      payload: !state.openSeeHiddenColumns,
    });
  };

  const handleOpenCharts = () => {
    dispatch({
      type: "SET_OPEN_CHARTS",
      payload: !state.openCharts,
    });
  };

  const handleOpenOptionsChart = () => {
    dispatch({
      type: "SET_OPEN_OPTIONS_CHART",
      payload: !state.openOptionsChart,
    });
  };

  //columnas
  const shortColumn = (key, direction) => {
    let tempFilings = state.filings;
    if (direction) {
      tempFilings.sort(function (a, b) {
        var textA = a[key];
        var textB = b[key];
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    } else {
      tempFilings.sort(function (a, b) {
        var textA = a[key];
        var textB = b[key];
        return textA > textB ? -1 : textA < textB ? 1 : 0;
      });
    }
    dispatch({ type: "SET_FILINGS", payload: tempFilings });
    dispatch({ type: "SET_RELOAD", payload: !state.reload });
  };

  const shortColumnColors = (direction) => {
    let tempFilings = [];
    let tempTagsText = [];
    for (let i = 0; i < state.tags.length; i++) {
      tempTagsText.push(state.tags[i].text);
    }
    tempTagsText.push("Sin Etiquetar");
    tempTagsText.sort();
    if (!direction) {
      tempTagsText.reverse();
    }
    let values = state.filings.map((filing) => {
      if (filing.tags.length === 0) {
        return "Sin Etiquetar";
      } else {
        return filing.tags[0].text;
      }
    });
    for (let i = 0; i < tempTagsText.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (tempTagsText[i] === values[j]) {
          tempFilings.push(state.filings[j]);
        }
      }
    }
    dispatch({ type: "SET_FILINGS", payload: tempFilings });
    dispatch({ type: "SET_RELOAD", payload: !state.reload });
  };

  const hideColumn = (idx) => {
    let tempHideColumns = state.hideColumns;
    tempHideColumns[idx] = !tempHideColumns[idx];
    //console.log(tempHideColumns);
    dispatch({ type: "SET_HIDDEN_COLUMNS", payload: tempHideColumns });
    dispatch({ type: "SET_RELOAD", payload: !state.reload });
  };

  const findColumn = (key, value) => {
    let tempFilings = state.filings;
    let tempArrayValues = state.filings.map((filing) => {
      return filing[key].toString().slice(0, value.length).toLowerCase();
    });
    for (let j = 0; j < tempArrayValues.length; j++) {
      if (value.toLowerCase() !== tempArrayValues[j]) {
        tempFilings[j].visible = false;
      } else {
        tempFilings[j].visible = true;
      }
    }
    dispatch({ type: "SET_FILINGS", payload: tempFilings });
    dispatch({ type: "SET_RELOAD", payload: !state.reload });
  };

  const filterDate = async (idx, newSelectedFilter) => {
    let tempSelectedFilters = state.selectedFilters;

    tempSelectedFilters[idx] = newSelectedFilter;

    let tempFilings = await filterMultiple(
      state.filings,
      tempSelectedFilters,
      state.columns,
      state.arrayFilters
    );

    dispatch({ type: "SET_FILINGS", payload: tempFilings });
  };

  const filterData = async (idx, arrayFilter, idxDelete) => {
    let tempFilings = state.filings;
    let tempSelectedFilters = state.selectedFilters;
    let tempActivesFilters = state.activesFilters;
    let tempFilterColumns = state.filterColumns;

    //actualizamos el array
    tempSelectedFilters[idx] = arrayFilter;
    //devuelve el array de filings con visible !visible
    tempFilings = await filterMultiple(
      state.filings,
      tempSelectedFilters,
      state.columns,
      state.arrayFilters
    );
    //console.log(tempFilings)
    //buscamos cual es el el siguiente identificador de
    let nextFilter = Math.max(...state.filterColumns) + 1;
    //colocamos la posicion del filter siempre y cuando sea diferente a 0
    if (tempFilterColumns[idx] === 0) {
      tempFilterColumns[idx] = nextFilter;
    }

    for (let i = 0; i < state.columns.length; i++) {
      if (tempFilterColumns[i] === 0 || tempFilterColumns[i] > nextFilter) {
        //console.log(tempFilings)
        tempActivesFilters[i] = await updateActiveFilters({
          dataFilings: tempFilings,
          key: state.columns[i].id,
          currentFilter: state.arrayFilters[i],
          temp: tempActivesFilters[i],
        });
      }
    }

    if (idxDelete !== null) {
      tempFilterColumns[idx] = 0;
      dispatch({
        type: "SET_FILTERS_DATA",
        payload: { filterColumns: tempFilterColumns },
      });
    }

    //console.log("before", tempActivesFilters[15])

    dispatch({
      type: "SET_FILTERS_DATA",
      payload: {
        filterColumns: tempFilterColumns,
        selectedFilters: tempSelectedFilters,
        activesFilters: tempActivesFilters,
      },
    });
    dispatch({ type: "SET_FILINGS", payload: tempFilings });
    dispatch({ type: "SET_RELOAD", payload: !state.reload });
  };

  const pinUpColumn = (key) => {
    let tempPinUpColumns = state.pinUp;
    for (let i = 0; i < state.columns.length; i++) {
      if (state.columns[i].id === key) {
        tempPinUpColumns[i] = true;
      } else {
        tempPinUpColumns[i] = false;
      }
    }
    dispatch({ type: "SET_PINUP", payload: tempPinUpColumns });
    dispatch({ type: "SET_RELOAD", payload: !state.reload });
  };

  const removeFilter = async (idxDelete, idx, arrayFilter) => {
    //buscamos si nfilter mayor al intentado eliminar
    if (state.filterColumns.some((e) => e > idxDelete)) {
      await filterData(idx, arrayFilter, idxDelete);
    } else {
      /*
      messageOnScreen(dispatch, {
        open: true,
        text: `POR FAVOR ELIMINE ANTES EL FILTRO ${lastNumbre}`,
        type: "info",
      });
	  */
    }
  };

  //info
  const infoSelecteds = () => {
    let totalAmount = 0;
    state.selects.forEach((item) => {
      totalAmount += item.amount;
    });
    console.log(
      `${state.selects.length} registros seleccionados. Suma total de: ${totalAmount}`
    );
  };

  //charts
  const generateOptionsChart = () => {
    let options = findDuplicateAttributes(state.selects, state.columns);
    if (options.length !== 0) {
      dispatch({
        type: "SET_OPTIONS_CHART",
        payload: options,
      });
      handleOpenOptionsChart();
    }
  };

  const generateDataChart = (option) => {
    handleOpenOptionsChart();
    dispatch({
      type: "SET_DATA_CHARTS",
      payload: {
        attribute: option.label,
        ...generateData(state.selects, option.attribute),
      },
    });
    handleOpenCharts();
  };

  return (
    <RealEstateContext.Provider
      value={{
        ...state,
        getFilings,
        handleSelected,
        handleUpdate,
        handleOpenFilingEdit,
        shortColumn,
        shortColumnColors,
        hideColumn,
        findColumn,
        filterData,
        pinUpColumn,
        removeFilter,
        filterDate,
        handleOpenForm,
        handleOpenTags,
        handleOpenChangeStates,
        handleOpenSeeHiddenColumns,
        handleOpenCharts,
        handleOpenOptionsChart,
        handleSelectedAll,
        handleSetWidthObservation,
        infoSelecteds,
        generateOptionsChart,
        generateDataChart,
      }}
    >
      {props.children}
    </RealEstateContext.Provider>
  );
};

export default RealEstateState;

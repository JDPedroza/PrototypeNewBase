import {
  SET_FILINGS,
  SET_COLUMNS,
  SET_PINUP,
  SET_HIDDEN_COLUMNS,
  SET_AMOUNT,
  SET_SELECTS,
  SET_FILING,
  SET_FILTERS_DATA,
  SET_RELOAD,
  SET_BANK,
  SET_OPEN_FORM,
  SET_OPEN_TAGS,
  SET_OPEN_CHANGE_STATE,
  SET_OPEN_SEE_HIDDEN_COLUMNS,
  SET_WIDTH_OBSERVATIONS,
  SET_LOADING,
  SET_WIDTH_COLUMNS,
  SET_OPEN_CHARTS,
  SET_OPEN_OPTIONS_CHART,
  SET_OPTIONS_CHART,
  SET_DATA_CHARTS
} from "../types";

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };

    case SET_FILINGS:
      return { ...state, filings: payload };

    case SET_COLUMNS:
      return { ...state, columns: payload };

    case SET_PINUP:
      return { ...state, pinUp: payload };

    case SET_HIDDEN_COLUMNS:
      return { ...state, hiddenColumns: payload };

    case SET_AMOUNT:
      return { ...state, amount: payload };

    case SET_SELECTS:
      return { ...state, selects: payload };

    case SET_FILING:
      return { ...state, filing: payload };

    case SET_FILTERS_DATA:
      return { ...state, ...payload };

    case SET_RELOAD:
      return { ...state, reload: payload };

    case SET_BANK:
      return { ...state, bank: payload };

    case SET_OPEN_FORM:
      return { ...state, openForm: payload };

    case SET_OPEN_TAGS:
      return { ...state, openTags: payload };

    case SET_OPEN_CHANGE_STATE:
      return { ...state, openChangeState: payload };

    case SET_OPEN_SEE_HIDDEN_COLUMNS:
      return { ...state, openSeeHiddenColumns: payload };

    case SET_OPEN_CHARTS:
      return { ...state, openCharts: payload };

    case SET_OPEN_OPTIONS_CHART:
      return { ...state, openOptionsChart: payload };

    case SET_OPTIONS_CHART:
      return { ...state, optionsChart: payload };

    case SET_WIDTH_OBSERVATIONS:
      return { ...state, widthObservations: payload };

    case SET_WIDTH_COLUMNS:
      return { ...state, widthColumns: payload };

    case SET_DATA_CHARTS:
      return { ...state, dataCharts: payload };

    default:
      break;
  }
};

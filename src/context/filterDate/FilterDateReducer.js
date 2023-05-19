import {
  SET_DATA_FILTER_DATE,
  SET_CHANGE_FILTER_DATE,
  SET_SELECT,
  SET_OPEN,
} from "../types";

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DATA_FILTER_DATE:
      return { ...state, ...payload };

    case SET_CHANGE_FILTER_DATE:
      return { ...state, change: payload };
    default:
      break;
  }
};

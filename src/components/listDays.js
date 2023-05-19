import React, { useContext, useEffect, useState } from "react";

//contexts
import FilterDateContext from "../context/filterDate/FilterDateContext";

//desing
import {
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const ListDays = ({ type, day, idxYear, idxMonth, idxDay }) => {
  const { change, getSelect, handleToggleSelect } =
    useContext(FilterDateContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getSelect(`${type}Selects`, idxYear, idxMonth, idxDay));
  }, [change]);

  return (
    <>
      <ListItem
        key={day}
        role={undefined}
        dense
        button
        style={{ width: "250px" }}
        onClick={() => {
          handleToggleSelect("daysSelects", !data, idxYear, idxMonth, idxDay);
          setData(!data);
        }}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": day }}
            checked={data}
            onClick={() => {
              handleToggleSelect(
                "daysSelects",
                !data,
                idxYear,
                idxMonth,
                idxDay
              );
              setData(!data);
            }}
          />
        </ListItemIcon>
        <ListItemText id={day} primary={day} />
      </ListItem>
    </>
  );
};

export default ListDays;

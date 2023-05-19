import React, { useContext, useEffect, useState } from "react";

//icons
import { ExpandLess, ExpandMore } from "@material-ui/icons";

//contexts
import FilterDateContext from "../context/filterDate/FilterDateContext";

//desing
import {
  List,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

//components
import ListDays from "./listDays";

//const
const labelMonths = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

const ListMonths = ({ type, month, idxMonth, idxYear }) => {
  const {
    dataFilter,
    dataActives,
    change,
    getOpen,
    getSelect,
    handleToggleSelect,
    handleToggleOpen,
  } = useContext(FilterDateContext);

  const [data, setData] = useState(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    setData(getSelect(`${type}Selects`, idxYear, idxMonth));
    setOpen(getOpen(`${type}Open`, idxYear, idxMonth));
  }, [change]);

  return (
    <>
      <ListItem
        key={month}
        role={undefined}
        dense
        button
        style={{ width: "250px" }}
        onClick={() => {
          handleToggleSelect("monthsSelects", !data, idxYear, idxMonth);
          setData(!data);
        }}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": month }}
            checked={data}
            onClick={() => {
              handleToggleSelect("monthsSelects", !data, idxYear, idxMonth);
              setData(!data);
            }}
          />
        </ListItemIcon>
        <ListItemText id={month} primary={labelMonths[parseInt(month)]} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              setOpen(!open);
              handleToggleOpen("monthsOpen", !open, idxYear, idxMonth);
            }}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {dataFilter.days[idxYear][idxMonth].map((day, idxDay) =>
            dataActives.daysActives[idxYear][idxMonth][idxDay] ? (
              <ListDays
                key={`${day}_${idxDay}_days`}
                day={day}
                idxDay={idxDay}
                idxMonth={idxMonth}
                idxYear={idxYear}
                type="days"
              />
            ) : (
              <></>
            )
          )}
        </List>
      </Collapse>
    </>
  );
};

export default ListMonths;

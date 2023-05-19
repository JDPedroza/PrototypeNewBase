import React, { useContext, useEffect, useState } from "react";

//icons
import { ExpandLess, ExpandMore } from "@material-ui/icons";

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

//context
import FilterDateContext from "../context/filterDate/FilterDateContext";

//components
import ListMonths from "./listMonths";

const ListYears = ({ year, idxYear, type }) => {
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
    setData(getSelect(`${type}Selects`, idxYear));
    setOpen(getOpen(`${type}Open`, idxYear));
  }, [change]);

  return (
    <>
      <ListItem
        key={`${year}_${idxYear}_item`}
        role={undefined}
        dense
        style={{ width: "250px" }}
        button
        onClick={() => {
          handleToggleSelect("yearsSelects", !data, idxYear);
          setData(!data);
        }}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": year }}
            checked={data}
            onClick={() => {
              handleToggleSelect("yearsSelects", !data, idxYear);
              setData(!data);
            }}
          />
        </ListItemIcon>
        <ListItemText id={year} primary={year} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              setOpen(!open);
              handleToggleOpen("yearsOpen", !open, idxYear);
            }}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        key={`${year}_${idxYear}_collapse`}
      >
        <List component="div" disablePadding>
          {dataFilter.months[idxYear].map((month, idxMonth) =>
            dataActives.monthsActives[idxYear][idxMonth] ? (
              <ListMonths
                key={`${month}_${idxMonth}_month`}
                month={month}
                idxMonth={idxMonth}
                type="months"
                idxYear={idxYear}
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

export default ListYears;

import React, { useState, useRef, useEffect, useContext } from "react";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Tooltip,
  List,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//icons
import FilterListIcon from "@material-ui/icons/FilterList";
import RealEstateContext from "../context/realEstate/RealEstateContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  root2: {
    width: "100%",
    backgroundColor: "white",
    maxHeight: "200px",
    overflow: "auto",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function PopperFilter(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const {
	dataAttribute,
    idx,
    arrayFilter,
    selectedFilters,
    activesFilter,
  } = props;

  const { filterData } = useContext(RealEstateContext);

  const [checked, setChecked] = useState([]);
  const [checkedALL, setCheckedAll] = useState(true);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    filterData(idx, newChecked, null);
    setChecked(newChecked);
  };

  const handleToggleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;

    setChecked(selectedFilters);
  }, [open, selectedFilters]);

  const handleToggleAll = () => {
    setCheckedAll(!checkedALL);
    const newChecked = [];
    if (!checkedALL) {
      for (let i = 0; i < arrayFilter.length; i++) {
        newChecked.push(arrayFilter[i]);
      }
    }
    filterData(idx, newChecked, null);
    setChecked(newChecked);
  };

  return (
    <div className={classes.root}>
      <div>
        <MenuItem
          onClick={() => {
            handleToggleOpen();
          }}
		  disabled={!dataAttribute.filter}
        >
          <Tooltip title="Filtrar Columna">
            <FilterListIcon />
          </Tooltip>
        </MenuItem>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{ maxHeight: "200px" }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
                maxHeight: "300px",
                boxShadow: "2px 2px 5px #999",
              }}
            >
              <List className={classes.root2}>
                <ListItem
                  role={undefined}
                  dense
                  button
                  style={{ width: "250px" }}
                  onClick={handleToggleAll}
                >
                  <ListItemIcon>
                    <Checkbox edge="start" checked={checkedALL} disableRipple />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      checkedALL ? "Deseleccionar Todos" : "Seleccionar Todos"
                    }
                  />
                </ListItem>
                {arrayFilter.map((value, idx) => {
                  const labelId = `checkbox-list-label-${value}`;
                  return !activesFilter[idx] ? (
                    <ListItem
                      key={value}
                      role={undefined}
                      dense
                      button
                      style={{ width: "250px" }}
                      onClick={handleToggle(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={value} />
                    </ListItem>
                  ) : (
                    ""
                  );
                })}
              </List>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

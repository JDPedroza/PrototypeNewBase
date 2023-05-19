import React, { useState, useRef, useEffect, useContext } from "react";

//desing
import { Tooltip, List, MenuItem, Popper, Grow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//icons
import FilterListIcon from "@material-ui/icons/FilterList";
import FilterDateContext from "../context/filterDate/FilterDateContext";

//components
import ListYears from "./listYears";
import ListEmply from "./listEmply";

//deinsg
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

const PopperFilterDate = (props) => {
  //context
  const { setData, dataFilter, dataActives } = useContext(FilterDateContext);

  //const desing
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  //data props
  const { idx, arrayFilter, selectedFilters, activesFilter, opennedFilters } =
    props;

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;

	console.log(activesFilter)

    setData({
      dataFilter: arrayFilter,
      dataSelect: selectedFilters,
      dataOpen: opennedFilters,
      dataActives: activesFilter,
      idx: idx,
    });
  }, [arrayFilter, selectedFilters]);

  return (
    <div className={classes.root}>
      <div>
        <MenuItem
          onClick={() => {
            setOpen((prevOpen) => !prevOpen);
          }}
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
                <ListEmply key={`emply_0_emply`} />
                {dataFilter.years.map((year, idxYear) =>
                  dataActives.yearsActives[idxYear] ? (
                    <ListYears
                      key={`${year}_${idxYear}_years`}
                      year={year}
                      idxYear={idxYear}
                      type="years"
                    />
                  ) : (
                    <></>
                  )
                )}
              </List>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default PopperFilterDate;

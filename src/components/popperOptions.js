import React, { useContext, useState, useRef } from "react";

//desing
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  IconButton,
  Tooltip,
  makeStyles,
} from "@material-ui/core";

//icons
import {
  ArrowDownward,
  ArrowUpward,
  Flag,
  MoreVert,
  VisibilityOff,
} from "@material-ui/icons";

//component
import PopperFilter from "./popperFilter";
import PopperFilterColors from "./popperfilterColors";
import PopperFilterDate from "./popperFilterDate";

//context
import FilterDateState from "../context/filterDate/FilterDateState";
import RealEstateContext from "../context/realEstate/RealEstateContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function PopperOptions(props) {
  //const desing
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  //functions context
  const { hideColumn, pinUpColumn, shortColumnColors, shortColumn } =
    useContext(RealEstateContext);

  const {
    idx,
    dataAttribute,
    arrayFilter,
    tags,
    selectedFilters,
    activesFilter,
    handleHovering,
    opennedFilters,
  } = props;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    handleHovering(open);
  };

  const handleShortColumn = (direction) => {
    if (dataAttribute.id === "edit") {
      /*
      messageOnScreen(dispatch, {
        open: true,
        text: "NO SE PUEDE REALIZAR ESTA OPERACIÓN EN ESTA COLUMNA",
        type: "error",
      });
	  */
    } else if (dataAttribute.id === "tags") {
      shortColumnColors(dataAttribute.id, direction);
    } else {
      shortColumn(dataAttribute.id, direction);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <IconButton
          color="primary"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVert fontSize="small" />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper style={{ position: "fixed", right: "-25px" }}>
                <ClickAwayListener
                  onClickAway={() => {
                    setOpen(false);
                  }}
                >
                  <MenuList autoFocusItem={open} id="menu-list-grow">
                    <MenuItem
                      onClick={() => {
                        handleShortColumn(true);
                      }}
                    >
                      <Tooltip title="Ordenar Acendentemente">
                        <ArrowUpward />
                      </Tooltip>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleShortColumn(false);
                      }}
                    >
                      <Tooltip title="Ordenar Decendentemente">
                        <ArrowDownward />
                      </Tooltip>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        hideColumn(idx);
                      }}
                    >
                      <Tooltip title="Ocultar Columna">
                        <VisibilityOff />
                      </Tooltip>
                    </MenuItem>
                    {idx === 0 ? (
                      <PopperFilterColors
                        idx={idx}
                        arrayFilter={arrayFilter}
                        selectedFilters={selectedFilters}
                        tags={tags}
                      />
                    ) : dataAttribute.type !== "date" ? (
                      arrayFilter.length !== 0 ? (
                        <PopperFilter
                          dataAttribute={dataAttribute}
                          idx={idx}
                          arrayFilter={arrayFilter}
                          selectedFilters={selectedFilters}
                          activesFilter={activesFilter}
                        />
                      ) : (
                        ""
                      )
                    ) : (
                      <FilterDateState>
                        <PopperFilterDate
                          idx={idx}
                          arrayFilter={arrayFilter}
                          selectedFilters={selectedFilters}
                          activesFilter={activesFilter}
                          opennedFilters={opennedFilters}
                        />
                      </FilterDateState>
                    )}

                    <MenuItem
                      onClick={() => {
                        pinUpColumn(dataAttribute.id);
                      }}
                    >
                      <Tooltip title="Fijar Columna">
                        <Flag />
                      </Tooltip>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

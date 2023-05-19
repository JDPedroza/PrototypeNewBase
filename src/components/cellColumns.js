import React, { useContext, useRef, useState } from "react";

//diseño
import { IconButton, TableCell, Tooltip } from "@material-ui/core";

import useHover from "@react-hook/hover";

//icons
import Filter1Icon from "@material-ui/icons/Filter1";
import Filter2Icon from "@material-ui/icons/Filter2";
import Filter3Icon from "@material-ui/icons/Filter3";
import Filter4Icon from "@material-ui/icons/Filter4";
import Filter5Icon from "@material-ui/icons/Filter5";
import Filter6Icon from "@material-ui/icons/Filter6";
import Filter7Icon from "@material-ui/icons/Filter7";
import Filter8Icon from "@material-ui/icons/Filter8";
import Filter9Icon from "@material-ui/icons/Filter9";
import Filter9PlusIcon from "@material-ui/icons/Filter9Plus";

//components
import PopperOptions from "./popperOptions";

//context
import RealEstateContext from "../context/realEstate/RealEstateContext";

const CellColumns = (props) => {
  const {
    idx,
    column,
    arrayFilter,
    tags,
    activesFilter,
    selectedFilters,
    opennedFilters,
    pinUp,
    filterColumn,
    width,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleResize,
  } = props;

  //functions context
  const { removeFilter } = useContext(RealEstateContext);

  //desing
  const target = useRef(null);
  const isHovering = useHover(target, { enterDelay: 0, leaveDelay: 0 });
  const [hovering, setHovering] = useState(false);

  return (
    <TableCell
      key={column.id}
	  id={`data_column_${column.id}`}
      align={column.align}
      style={{
        minWidth: width,
        userSelect: "none",
        cursor: "pointer",
        borderRight: "solid 1px #ccc",
        position: pinUp ? "sticky" : "relative",
        background: "white",
        zIndex: pinUp ? 100 : 50,
        left: 0,
      }}
      ref={target}
    >
      {column.label}
      <div
        style={{
          height: "100%",
          backgroundColor: "transparent",
          position: "absolute",
          right: 0,
          top: 0,
          cursor: "col-resize",
          width: handleResize ? "100% " : 5,
        }}
        onMouseDown={(e) => handleMouseDown(e, idx)}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
      {isHovering || hovering ? (
        !handleResize ? (
          <div
            style={{
              position: "absolute",
              top: "0px",
              right: "10px",
              height: "100%",
              alignContent: "center",
              display: "grid",
              zIndex: 200,
            }}
          >
            <PopperOptions
              idx={idx}
              dataAttribute={column}
              arrayFilter={arrayFilter}
              tags={tags}
              selectedFilters={selectedFilters}
              opennedFilters={opennedFilters}
              activesFilter={activesFilter}
              handleHovering={(open) => {
                setHovering(!open);
              }}
            />
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      {filterColumn !== 0 && !handleResize ? (
        <Tooltip title="Remover Filtro">
          <IconButton
            size="small"
            onClick={() => removeFilter(filterColumn, column.key, arrayFilter)}
          >
            {filterColumn === 1 ? (
              <Filter1Icon />
            ) : filterColumn === 2 ? (
              <Filter2Icon />
            ) : filterColumn === 3 ? (
              <Filter3Icon />
            ) : filterColumn === 4 ? (
              <Filter4Icon />
            ) : filterColumn === 5 ? (
              <Filter5Icon />
            ) : filterColumn === 6 ? (
              <Filter6Icon />
            ) : filterColumn === 7 ? (
              <Filter7Icon />
            ) : filterColumn === 8 ? (
              <Filter8Icon />
            ) : filterColumn === 9 ? (
              <Filter9Icon />
            ) : (
              <Filter9PlusIcon />
            )}
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </TableCell>
  );
};

export default CellColumns;

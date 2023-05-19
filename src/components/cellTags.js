import React, { useContext } from "react";

import { TableCell, Tooltip } from "@material-ui/core";

import RealEstateContext from "../context/realEstate/RealEstateContext";

const CellTags = ({ dataFiling, pinUp }) => {
  let percentage = 100;
  if (dataFiling.tags.length !== 0) {
    percentage = (1 * 100) / dataFiling.tags.length;
  }

  const {} = useContext(RealEstateContext);

  return (
    <TableCell
      style={
        pinUp
          ? {
              backgroundColor: "white",
              position: "sticky",
              left: 0,
              borderRight: "solid 1px #ccc",
              paddingLeft: 0,
              paddingRight: 0,
            }
          : {
              borderRight: "solid 1px #ccc",
              paddingLeft: 0,
              paddingRight: 0,
            }
      }
    >
      {dataFiling.tags.length !== 0
        ? dataFiling.tags.map((tag, idx) => (
            <Tooltip title={tag.text} key={`tags_${idx}`} >
              <div
                onClick={() => console.log("asd")}
                style={{
                  width: `${percentage}%`,
                  height: "100%",
                  backgroundColor: tag.color,
                  float: "left",
                  cursor: "pointer",
                }}
              >
                &nbsp;
              </div>
            </Tooltip>
          ))
        : ""}
    </TableCell>
  );
};

export default CellTags;

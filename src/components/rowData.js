import React, { useContext, useEffect, useState } from "react";

import { TableRow } from "@material-ui/core";

import RealEstateContext from "../context/realEstate/RealEstateContext";

import CellData from "./cellData";
import CellTags from "./cellTags";
import CellEdit from "./cellEdit";
import CellObservations from "./cellObservations";

const RowData = ({ dataFiling, idxFiling, seletedFiling }) => {
  const [selected, setSelected] = useState(false);

  const { columns, pinUp, hiddenColumns, handleSelected } =
    useContext(RealEstateContext);

  useEffect(() => {
    setSelected(seletedFiling);
  }, [seletedFiling]);

  const updateSelected = () => {
    handleSelected(!selected, dataFiling);
    setSelected(!selected);
  };

  return (
    <TableRow
      key={`row_${dataFiling.nid}_${idxFiling}`}
      style={selected ? { backgroundColor: "#ccc" } : {}}
      onClick={(evt) => {
        if (evt.ctrlKey) {
          setSelected(!selected);
          updateSelected();
        }
      }}
    >
      <CellTags dataFiling={dataFiling} pinUp={pinUp[0]} />
      {columns.map((dataAttribute, idxAttribute) => {
        if (dataAttribute.print && !hiddenColumns[idxAttribute]) {
          if (dataAttribute.id === "observations") {
            return (
              <CellObservations
                key={`cell_${dataAttribute.id}_${idxAttribute}`}
                idxFiling={idxFiling}
                dataFiling={dataFiling}
                dataAttribute={dataAttribute}
                idxAttribute={idxAttribute}
                updateSelected={updateSelected}
                selected={selected}
              />
            );
          } else {
            return (
              <CellData
                key={`cell_${dataAttribute.id}_${idxAttribute}`}
                idxFiling={idxFiling}
                dataFiling={dataFiling}
                dataAttribute={dataAttribute}
                idxAttribute={idxAttribute}
                updateSelected={updateSelected}
                selected={selected}
                pinUp={pinUp[idxAttribute]}
                hideColumns={hiddenColumns[idxAttribute]}
              />
            );
          }
        } else {
          return <></>;
        }
      })}
      <CellEdit dataFiling={dataFiling} idxFiling={idxFiling} />
    </TableRow>
  );
};

export default RowData;

import React, { useContext, useEffect, useRef, useState } from "react";

import RealEstateContext from "../context/realEstate/RealEstateContext";

import { Table, TableHead, TableBody, TableRow } from "@material-ui/core";

//components
import RowData from "./rowData";
import CellColumns from "./cellColumns";
import DialogForm from "./dialogForm";
import Tools from "./tools";
import DialogSeeHiddenColumns from "./dialogSeeHiddenColumns";
import DialogCharts from "./charts/dialogCharts";
import DialogOptionsChart from "./dialogOptionsChart";

const RealEstate = () => {
  const {
    loading,
    getFilings,
    filings,
    tags,
    columns,
    widthColumns,
    hiddenColumns,
    arrayFilters,
    activesFilters,
    selectedFilters,
    opennedFilters,
    pinUp,
    filterColumns,
    reload,
    handleSetWidthObservation,
  } = useContext(RealEstateContext);

  useEffect(() => {
    setColumnWidths(widthColumns);
  }, [loading]);

  const [columnWidths, setColumnWidths] = useState([]);
  const [resizingIndex, setResizingIndex] = useState(null);
  const [handleResize, setHandleResize] = useState(false);
  const tableRef = useRef();

  const handleMouseUp = () => {
    setResizingIndex(null);
    setHandleResize(false);
  };

  const handleMouseMove = (e) => {
    if (resizingIndex === null) return;
    const currentX = e.pageX - tableRef.current.offsetLeft;
    const diffX = currentX - startX.current;
    const newWidth = Math.max(
      columns[resizingIndex].minWidth,
      columnWidths[resizingIndex] + diffX
    );
    const newColumnWidths = [...columnWidths];
    newColumnWidths[resizingIndex] = newWidth;
    setColumnWidths(newColumnWidths);
    startX.current = currentX;
    if (columns[resizingIndex].id === "observations") {
      handleSetWidthObservation(newWidth);
    }
  };

  const startX = useRef();

  const handleMouseDown = (e, index) => {
    setResizingIndex(index);
    startX.current = e.pageX - tableRef.current.getBoundingClientRect().left;
    setHandleResize(true);
  };

  useEffect(() => {
    getFilings("FilingsBBVA");
  }, []);

  return !loading ? (
    <div
      style={{
        margin: "20px auto",
        width: "80%",
        overflow: "auto",
        border: "solid 1px red",
        height: "calc(100vh - 40px)",
      }}
    >
      <Table size="small" ref={tableRef}>
        <TableHead style={{ position: "sticky", top: 0, zIndex: 200 }}>
          <TableRow>
            {columns.map((dataAttribute, idxColumns) =>
              hiddenColumns[idxColumns] ? (
                ""
              ) : (
                <CellColumns
                  key={`cell_columns_${idxColumns}`}
                  idx={idxColumns}
                  column={dataAttribute}
                  arrayFilter={arrayFilters[idxColumns]}
                  tags={tags}
                  activesFilter={activesFilters[idxColumns]}
                  opennedFilters={opennedFilters[idxColumns]}
                  selectedFilters={selectedFilters[idxColumns]}
                  pinUp={pinUp[idxColumns]}
                  filterColumn={filterColumns[idxColumns]}
                  width={columnWidths[idxColumns]}
                  handleMouseDown={handleMouseDown}
                  handleMouseMove={handleMouseMove}
                  handleMouseUp={handleMouseUp}
                  handleResize={handleResize}
                />
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody
          key={`reload_${reload ? "true" : "false"}`}
          style={{ zIndex: 200 }}
        >
          {filings.map((dataFiling, idxFiling) => (
            <>
              {dataFiling.visible ? (
                <RowData
                  key={`Row_Data_${idxFiling}`}
                  dataFiling={dataFiling}
                  idxFiling={idxFiling}
                  seletedFiling={dataFiling.selected}
                />
              ) : (
                ""
              )}
            </>
          ))}
        </TableBody>
      </Table>
      <Tools />
      <DialogForm />
      <DialogSeeHiddenColumns />
      <DialogOptionsChart />
      <DialogCharts />
    </div>
  ) : (
    <></>
  );
};

export default RealEstate;

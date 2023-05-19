import React, { useContext, useEffect, useState } from "react";

import {
  TableCell,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import DialogEdit from "./dialogEdit";
import {
  BarChart,
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  Edit,
  Info,
  ListAlt,
} from "@material-ui/icons";

import RealEstateContext from "../context/realEstate/RealEstateContext";

const CellData = ({
  dataFiling,
  idxFiling,
  dataAttribute,
  idxAttribute,
  updateSelected,
  selected,
  hideColumns,
  pinUp,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ top: 0, left: 0 });
  const [anchor, setAnchor] = useState(null);
  const [show, setShow] = useState(false);
  const { handleOpenFilingEdit, infoSelecteds, generateOptionsChart } =
    useContext(RealEstateContext);

  const [data, setData] = useState("");

  const handleChange = (data) => {
    setData(data.value);
    setOpenEdit(false);
  };

  useEffect(() => {
    setData(dataFiling[dataAttribute.id]);
    function oMousePos(element, evt) {
      var ClientRect = element.getBoundingClientRect();
      return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top),
      };
    }

    var tableCellDom = document.getElementById(
      `tableCellDom_${idxFiling}_${idxAttribute}`
    );

    (() => {
      tableCellDom.addEventListener(
        "contextmenu",
        function (evt) {
          evt.preventDefault();
          var mousePos = oMousePos(tableCellDom, evt);
          setAnchorPoint({ left: mousePos.x + 10, top: mousePos.y + 10 });
          setShow(true);
          setAnchor(
            document.getElementById(
              `idContextMenu_${idxFiling}_${idxAttribute}`
            )
          );
        },
        false
      );
    })();
  }, [dataFiling]);

  return (
    <>
      {!hideColumns ? (
        <TableCell
          id={`tableCellDom_${idxFiling}_${idxAttribute}`}
          style={
            pinUp
              ? {
                  backgroundColor: selected ? "#ccc" : "white",
                  position: "sticky",
                  left: 0,
                  borderRight: "solid 1px #ccc",
                  zIndex: 2,
                }
              : { borderRight: "solid 1px #ccc", position: "relative" }
          }
          align={dataAttribute.align}
        >
          <Typography style={{ fontSize: "0.875rem" }}>
            {dataAttribute.type === "money"
              ? new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  maximumFractionDigits: 0,
                }).format(Math.round(data))
              : data}
          </Typography>
          {show ? (
            <div
              style={{
                ...anchorPoint,
                position: "absolute",
                background: "transparent",
              }}
              id={`idContextMenu_${idxFiling}_${idxAttribute}`}
            />
          ) : (
            ""
          )}
          <Popover
            open={Boolean(anchor)}
            anchorEl={anchor}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            onClose={() => setAnchor(null)}
          >
            <List dense>
              <ListItem
                onClick={() => {
                  updateSelected();
                  setShow(false);
                  setAnchor(null);
                }}
                style={{ cursor: "pointer" }}
              >
                {selected ? (
                  <CheckBoxOutlineBlankOutlined style={{ marginRight: 10 }} />
                ) : (
                  <CheckBox style={{ marginRight: 10 }} />
                )}
                <ListItemText
                  primary={
                    selected ? "Deseleccionar Registro" : "Seleccionar Registro"
                  }
                />
              </ListItem>
              <ListItem
                onClick={() => {
                  handleOpenFilingEdit(idxFiling);
                  setShow(false);
                  setAnchor(null);
                }}
                style={{ cursor: "pointer" }}
              >
                <ListAlt style={{ marginRight: 10 }} />
                <ListItemText primary="Modificar Registro" />
              </ListItem>
              {dataAttribute.edit ? (
                <ListItem
                  onClick={() => {
                    setOpenEdit(true);
                    setShow(false);
                    setAnchor(null);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Edit style={{ marginRight: 10 }} />
                  <ListItemText primary="Modificar Celda" />
                </ListItem>
              ) : (
                <></>
              )}
              {selected ? (
                <>
                  <ListItem
                    onClick={() => {
                      setShow(false);
                      setAnchor(null);
                      infoSelecteds();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Info style={{ marginRight: 10 }} />
                    <ListItemText primary="Información Seleccionados" />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      setShow(false);
                      setAnchor(null);
                      generateOptionsChart();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <BarChart style={{ marginRight: 10 }} />
                    <ListItemText primary="Grafica Dinamica" />
                  </ListItem>
                </>
              ) : (
                <></>
              )}
            </List>
          </Popover>
        </TableCell>
      ) : (
        <></>
      )}
      <DialogEdit
        openEdit={openEdit}
        dataAttribute={dataAttribute}
        dataFiling={dataFiling}
        handleClose={() => {
          setOpenEdit(false);
        }}
        handleChange={handleChange}
      />
    </>
  );
};

export default CellData;

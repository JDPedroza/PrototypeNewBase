import React, { useState, useEffect, useContext } from "react";

//desing
import {
  TableCell,
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

//components
import DialogObservations from "./dialogObservations";
import DialogAddObservation from "./dialogAddObservation";

//icons
import {
  BarChart,
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  ListAlt,
  History,
  Add,
  Info,
} from "@material-ui/icons";

//context
import RealEstateContext from "../context/realEstate/RealEstateContext";

const CellObservations = ({
  dataFiling,
  idxFiling,
  dataAttribute,
  idxAttribute,
  updateSelected,
  selected,
}) => {
  const [data, setData] = useState([""]);
  const [openAddObservation, setOpenAddObservation] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ top: 0, left: 0 });
  const [anchor, setAnchor] = useState(null);
  const [show, setShow] = useState(false);
  const { handleOpenFilingEdit, infoSelecteds, generateOptionsChart } =
    useContext(RealEstateContext);
  const [openHistoryObservation, setOpenHistoryObservation] = useState(false);

  const { widthObservations } = useContext(RealEstateContext);

  const handleChange = (dataObservation) => {
    let tempData = data;
    tempData.unshift(dataObservation);
    setData(tempData);
    setOpenAddObservation(false);
  };

  useEffect(() => {
    setData(dataFiling[dataAttribute.id]);
    setOpenAddObservation(false);
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
  }, []);

  return (
    <TableCell
      id={`tableCellDom_${idxFiling}_${idxAttribute}`}
      style={{
        borderRight: "solid 1px #ccc",
        position: "relative",
      }}
    >
      <Tooltip title={data[0]}>
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: widthObservations,
          }}
        >
          {data[0]}
        </div>
      </Tooltip>
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
          <ListItem
            onClick={() => {
              setOpenAddObservation(true);
              setShow(false);
              setAnchor(null);
            }}
            style={{ cursor: "pointer" }}
          >
            <Add style={{ marginRight: 10 }} />
            <ListItemText primary="Agregar Observación" />
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenHistoryObservation(true);
              setShow(false);
              setAnchor(null);
            }}
            style={{ cursor: "pointer" }}
          >
            <History style={{ marginRight: 10 }} />
            <ListItemText primary="Ver Historial" />
          </ListItem>
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
      <DialogAddObservation
        open={openAddObservation}
        dataFiling={dataFiling}
        handleClose={() => {
          setOpenAddObservation(false);
        }}
        handleChange={handleChange}
      />
      <DialogObservations
        open={openHistoryObservation}
        dataObservations={data}
        handleClose={() => {
          setOpenHistoryObservation(false);
        }}
      />
    </TableCell>
  );
};

export default CellObservations;

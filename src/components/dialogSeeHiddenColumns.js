import React, { useContext } from "react";

//
import {
  Dialog,
  Tooltip,
  IconButton,
  Switch,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
} from "@material-ui/core";

//icons
import { Close } from "@material-ui/icons";

//context
import RealEstateContext from "../context/realEstate/RealEstateContext";

export default function DialogSeeHiddenColumns() {
  const {
    openSeeHiddenColumns,
    columns,
    handleOpenSeeHiddenColumns,
    hideColumn,
    hiddenColumns,
  } = useContext(RealEstateContext);

  return (
    <Dialog
      onClose={handleOpenSeeHiddenColumns}
      aria-labelledby="simple-dialog-title"
      open={openSeeHiddenColumns}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="simple-dialog-title">
        Mostrar Ocultar Columnas
        <Tooltip title="Cancelar" style={{ float: "right" }}>
          <IconButton size="small" onClick={handleOpenSeeHiddenColumns}>
            <Close />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <List>
        {columns.map((column, idx) => (
          <ListItem key={`list_item_${idx}`}>
            <Switch
              checked={hiddenColumns[idx]}
              onChange={() => {
                hideColumn(idx);
              }}
              color="primary"
              disabled={
                column.id === "edit" || column.id === "tags" ? true : false
              }
            />
            <ListItemText primary={column.label} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

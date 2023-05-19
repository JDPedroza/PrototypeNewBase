import { useEffect, useState } from "react";

//desing
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";

//icons
import { Close, Remove } from "@material-ui/icons";

const DialogObservations = ({ dataObservations, open, handleClose }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataObservations);
  }, [open]);

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle style={{ borderBottom: "solid 1px #04c689" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Historial de Observaciones
          <Tooltip title="Cerrar">
            <IconButton onClick={handleClose} color="primary">
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      </DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <List>
          {data.map((dataObservation, idx) => (
            <ListItem key={`data_${idx}`}>
              <ListItemIcon>
                <Remove />
              </ListItemIcon>
              <ListItemText>{dataObservation}</ListItemText>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default DialogObservations;

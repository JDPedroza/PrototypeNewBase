import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const DialogAddObservation = ({
  open,
  dataFiling,
  handleClose,
  handleChange,
}) => {
  const [data, setData] = useState("");
  const [error, setError] = useState(false);

  const handleChangeData = (e) => {
    setData(e.target.value);
    setError(false);
  };

  const handleConfirm = () => {
    let done = true;

    if (data === "") {
      setError(true);
      done = false;
    } else {
      setError(false);
    }

    if (done) {
      handleChange(data);
    } else {
      console.log("hay errores en los datos");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Nueva Observación - {dataFiling.nid}</DialogTitle>
      <DialogContent>
        <TextField
          name="observations"
          label="Observación"
          variant="outlined"
          fullWidth
          onChange={handleChangeData}
          error={error}
          value={data}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddObservation;

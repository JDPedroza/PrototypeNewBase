import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import EditTextfield from "./editTextfield";
import EditSelect from "./editSelect";
import EditDate from "./editDate";

const DialogEdit = ({
  dataAttribute,
  dataFiling,
  openEdit,
  handleClose,
  handleChange,
}) => {
  const [data, setData] = useState({
    name: "",
    value: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    setData({
      name: dataAttribute.id,
      value: dataFiling[dataAttribute.id],
    });
  }, [openEdit]);

  const handleChangeData = (data) => {
    setData(data);
    setError(false);
  };

  const handleConfirm = () => {
    let done = true;
    for (const attribute in data) {
      if (data[attribute] === "") {
        setError(true);
        done = false;
      } else {
        setError(false);
      }
    }
    if (done) {
      handleChange(data);
    } else {
      console.log("hay errores en los datos");
    }
  };

  return (
    <Dialog open={openEdit} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Modificación {dataAttribute.label} - {dataFiling.nid}
      </DialogTitle>
      <DialogContent>
        {dataAttribute.form === "textField" ? (
          <EditTextfield
            data={data}
            dataAttribute={dataAttribute}
            handleChange={handleChangeData}
            error={error}
          />
        ) : dataAttribute.form === "select" ? (
          <EditSelect
            data={data}
            dataAttribute={dataAttribute}
            handleChange={handleChangeData}
            error={error}
          />
        ) : dataAttribute.form === "date" ? (
          <EditDate
            data={data}
            dataAttribute={dataAttribute}
            handleChange={handleChangeData}
            error={error}
          />
        ) : (
          <></>
        )}
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

export default DialogEdit;

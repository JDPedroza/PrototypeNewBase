import React, { useContext, useState } from "react";

//desing
import {
  Dialog,
  Tooltip,
  IconButton,
  DialogTitle,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

//icons
import { Close } from "@material-ui/icons";

//context
import RealEstateContext from "../context/realEstate/RealEstateContext";

export default function DialogOptionsChart() {
  const {
    openOptionsChart,
    optionsChart,
    handleOpenOptionsChart,
    generateDataChart,
  } = useContext(RealEstateContext);

  const [value, setValue] = useState("");

  const handleConfirm = () => {
    if (value !== "") {
      generateDataChart(optionsChart.find((e) => e.attribute === value));
    }
  };

  return (
    <Dialog
      onClose={handleOpenOptionsChart}
      open={openOptionsChart}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="simple-dialog-title">
        <Tooltip title="Cancelar" style={{ float: "right" }}>
          <IconButton size="small" onClick={handleOpenOptionsChart}>
            <Close />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            >
              {optionsChart.map((option, idx) => (
                <FormControlLabel
                  key={`${option.attribute}_${idx}`}
                  value={option.attribute}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormLabel>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenOptionsChart}
        >
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

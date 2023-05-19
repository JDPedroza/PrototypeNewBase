import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";

import {
  Save,
  Visibility,
  Label,
  Edit,
  CheckBox,
  CheckBoxOutlineBlank,
  Add,
  Filter9Plus,
  Backup,
} from "@material-ui/icons";
import RealEstateContext from "../context/realEstate/RealEstateContext";

const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  exampleWrapper: {
    position: "relative",
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

export default function Tools(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { handleOpenDialogSaves, removeAllFilter, sendToBackup } = props;

  const {
    handleOpenForm,
    handleOpenTags,
    handleOpenChangeStates,
    handleOpenSeeHiddenColumns,
    handleSelectedAll,
  } = useContext(RealEstateContext);

  const actions = [
    { icon: <Add onClick={handleOpenForm} />, name: "Agregar Radicado" },
    { icon: <Label onClick={handleOpenTags} />, name: "Etiquetar" },
    {
      icon: <Edit onClick={handleOpenChangeStates} />,
      name: "Editar selección",
    },
    {
      icon: <Visibility onClick={handleOpenSeeHiddenColumns} />,
      name: "Ver/Ocultar Columnas",
    },
    {
      icon: <CheckBox onClick={() => handleSelectedAll(true)} />,
      name: "Seleccionar Todo",
    },
    {
      icon: <CheckBoxOutlineBlank onClick={() => handleSelectedAll(false)} />,
      name: "Deseleccionar Todo",
    },
    {
      icon: <Filter9Plus onClick={removeAllFilter} />,
      name: "Remover todos los filtros.",
    },
    {
      icon: <Backup onClick={sendToBackup} />,
      name: "Generar Backup",
    },
    {
      icon: <Save onClick={handleOpenDialogSaves} />,
      name: "Guardar Excel",
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <SpeedDial
      ariaLabel="Herramientas"
      className={classes.speedDial}
      hidden={false}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="up"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleClose}
        />
      ))}
    </SpeedDial>
  );
}


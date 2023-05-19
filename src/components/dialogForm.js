import { useContext, forwardRef, useEffect, useState } from "react";

//desing
import {
  Dialog,
  Slide,
  Container,
  Grid,
  TextField,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  FormGroup,
  Typography,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

//context
import RealEstateContext from "../context/realEstate/RealEstateContext";
import SelectForm from "./selectForm";
import DateForm from "./dateForm";
import AutocompleteMultipleForm from "./autocompleteMultipleForm";

//packages
import NumberFormat from "react-number-format";
import ObservationForm from "./observationForm";

//icons
import { Close, Save } from "@material-ui/icons";

//const
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

const DialogForm = () => {
  const { openForm, handleOpenForm, filing, columns, bank, handleUpdate } =
    useContext(RealEstateContext);

  const [dataForm, setDataForm] = useState({});
  const [emailSend, setEmailSend] = useState(true);

  useEffect(() => {
    if (Object.entries(filing).length !== 0) {
      setDataForm(filing);
    } else {
      let tempDataForm = {};
      for (let i = 0; i < columns.length; i++) {
        tempDataForm[columns[i].id] = columns[i].initState;
      }
      setDataForm(tempDataForm);
    }
  }, [filing]);

  return (
    <Dialog
      fullScreen
      open={openForm}
      onClose={handleOpenForm}
      TransitionComponent={Transition}
    >
      <AppBar
        style={{
          position: "relative",
        }}
      >
        <Toolbar>
          <Tooltip title="Cancelar">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOpenForm}
              aria-label="close"
            >
              <Close style={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h6"
            style={{
              marginLeft: 2,
              flex: 1,
              color: "white",
            }}
          >
            Editar Radicado {dataForm.nid}
          </Typography>
          {!bank.includes("backups") ? (
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={emailSend}
                    onChange={(e) => {
                      setEmailSend(e.target.checked);
                    }}
                    color="primary"
                    style={{ color: "white" }}
                  />
                }
                style={{ color: "white" }}
                label="Enviar correo de notificación"
              />
            </FormGroup>
          ) : (
            ""
          )}
          {!bank.includes("backups") ? (
            <Tooltip title="Guardar">
              <IconButton onClick={handleUpdate}>
                <Save style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ padding: 20 }}>
        {Object.entries(dataForm).length !== 0 ? (
          <Grid container spacing={2}>
            {columns.map((data, idx) => {
              if (data.edit) {
                if (data.form === "textField") {
                  return (
                    <Grid item sm={12} md={6} key={`${data.id}_${idx}`}>
                      <TextField
                        name={data.id}
                        value={dataForm[data.id]}
                        variant="outlined"
                        label={data.label}
                        type={data.type === "money" ? "text" : data.type}
                        fullWidth
                        onChange={(e) => {
                          const { value, name } = e.target;
                          setDataForm((prev) => ({ ...prev, [name]: value }));
                        }}
                        InputProps={
                          data.type === "money"
                            ? {
                                inputComponent: NumberFormatCustom,
                              }
                            : {}
                        }
                      />
                    </Grid>
                  );
                } else if (data.form === "select") {
                  return (
                    <SelectForm
                      key={`${data.id}_${idx}`}
                      data={data}
                      dataFiling={dataForm[data.id]}
                      changeData={(e) => {
                        const { value, name } = e.target;
                        setDataForm((prev) => ({ ...prev, [name]: value }));
                      }}
                    />
                  );
                } else if (data.form === "date") {
                  return (
                    <DateForm
                      key={`${data.id}_${idx}`}
                      data={data}
                      dataFiling={dataForm[data.id]}
                      changeData={(e) => {
                        const { value, name } = e.target;
                        setDataForm((prev) => ({ ...prev, [name]: value }));
                      }}
                    />
                  );
                } else if (data.form === "observations") {
                  return (
                    <ObservationForm
                      key={`${data.id}_${idx}`}
                      dataFiling={dataForm[data.id]}
                      changeData={(e) => {
                        const { value, name } = e.target;
                        setDataForm((prev) => ({ ...prev, [name]: value }));
                      }}
                    />
                  );
                } else if (data.form === "autocompleteMultiple") {
                  <AutocompleteMultipleForm
                    data={data}
                    dataFiling={dataForm[data.id]}
                    changeData={(e) => {
                      const { value, name } = e.target;
                      setDataForm((prev) => ({ ...prev, [name]: value }));
                    }}
                  />;
                } else {
                  <></>;
                }
              } else {
                return <></>;
              }
            })}
          </Grid>
        ) : (
          <></>
        )}
      </Container>
    </Dialog>
  );
};

export default DialogForm;

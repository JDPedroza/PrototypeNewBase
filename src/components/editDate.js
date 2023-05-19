import React, { useEffect, useState } from "react";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const EditDate = ({ data, dataAttribute, handleChange, error }) => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    setDate(new Date(data.value));
  }, [data]);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        fullWidth
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={dataAttribute.label}
        value={date}
        error={error}
        onChange={(date) => {
          setDate(date);
          handleChange({
            name: data.name,
            value: `${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`,
          });
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default EditDate;

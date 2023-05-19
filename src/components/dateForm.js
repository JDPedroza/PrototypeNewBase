
import { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

const DateForm = ({ data, changeData, dataFiling }) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(new Date(dataFiling));
  }, [dataFiling]);

  return (
    <Grid item sm={12} md={6}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={data.label}
          value={date}
          onChange={(date) => {
            setDate(date);
            changeData({
              target: {
                name: data.id,
                value: `${
                  date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()}`,
              },
            });
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};
export default DateForm;

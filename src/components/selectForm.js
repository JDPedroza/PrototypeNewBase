import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useState } from "react";

const SelectForm = ({ data, changeData, dataFiling }) => {
  const [open, setOpen] = useState(false);
  return (
    <Grid item sm={12} md={6}>
      <FormControl fullWidth>
        <InputLabel>{data.label}</InputLabel>
        <Select
          name={data.id}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onOpen={() => {
            setOpen(true);
          }}
          value={dataFiling}
          onChange={changeData}
          fullWidth
        >
          <MenuItem value={""}>
            <em>AA</em>
          </MenuItem>
          {data.list.map((line, idx) => (
            <MenuItem value={line} key={`${line}_${idx}`}>
              {line}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default SelectForm;

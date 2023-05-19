import React, { useState } from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const EditSelect = ({ data, dataAttribute, handleChange, error }) => {
  const [open, setOpen] = useState(false);

  return (
    <FormControl fullWidth error={error}>
      <InputLabel>{dataAttribute.label}</InputLabel>
      <Select
        name={data.name}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        value={data.value}
        onChange={(e) => {
          const { name, value } = e.target;
          handleChange({ name, value });
        }}
        fullWidth
      >
        <MenuItem value={""}>
          <em>AA</em>
        </MenuItem>
        {dataAttribute.list.map((line, idx) => (
          <MenuItem value={line} key={`${line}_${idx}`}>
            {line}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EditSelect;

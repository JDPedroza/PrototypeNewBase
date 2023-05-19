import React from "react";

import { TextField } from "@material-ui/core";

import NumberFormat from "react-number-format";

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

const EditTextfield = ({ data, dataAttribute, handleChange, error }) => {
  return (
    <TextField
      name={data.name}
      value={data.value}
      variant="outlined"
      label={dataAttribute.label}
      type={dataAttribute.type === "money" ? "text" : dataAttribute.type}
      fullWidth
      error={error}
      onChange={(e) => {
        const { name, value } = e.target;
        handleChange({ name, value });
      }}
      InputProps={
        dataAttribute.type === "money"
          ? {
              inputComponent: NumberFormatCustom,
            }
          : {}
      }
    />
  );
};

export default EditTextfield;

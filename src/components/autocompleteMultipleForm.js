import { useEffect, useState } from "react";

//desing
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const AutocompleteMultipleForm = ({ dataFiling, data, changeData, error }) => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    let tempValue = [];
    if (dataFiling !== undefined && dataFiling !== "") {
      let arrayData = dataFiling.split("/");
      for (let i = 0; i < arrayData.length; i++) {
        let index = data.list.findIndex((e) => e.title === arrayData[i]);
        if (index !== -1) {
          tempValue.push(data.list[index]);
        }
      }
    }
    setValue(tempValue);
  }, []);

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={data.list}
      value={value}
      getOptionLabel={(option) => option.title}
      defaultValue={[]}
      onChange={(event, newValue) => {
        setValue(newValue);
        let data = "";
        for (let i = 0; i < newValue.length; i++) {
          data += newValue[i].title;
          if (i < newValue.length - 1) {
            data += "/";
          }
        }
        changeData({ target: { name: data.id, value: data } });
      }}
      groupBy={(option) => option.group}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={data.label}
          error={error}
        />
      )}
    />
  );
};

export default AutocompleteMultipleForm;

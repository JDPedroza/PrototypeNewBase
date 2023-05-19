import React, { useContext, useEffect, useState } from "react";
import FilterDateContext from "../context/filterDate/FilterDateContext";

//desing
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@material-ui/core";

const ListEmply = () => {
  const { change, getSelect, handleToggleSelect } =
    useContext(FilterDateContext);

  const [dataChecked, setDataChecked] = useState(false);

  useEffect(() => {
    setDataChecked(getSelect("emply"));
  }, [change]);

  return (
    <ListItem
      key={`${dataChecked}_item`}
      role={undefined}
      dense
      style={{ width: "250px" }}
      button
      onClick={() => {
        handleToggleSelect("emply", !dataChecked);
        setDataChecked(!dataChecked);
      }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": dataChecked }}
          checked={dataChecked}
          onClick={() => {
            handleToggleSelect("emply", !dataChecked);
            setDataChecked(!dataChecked);
          }}
        />
      </ListItemIcon>
      <ListItemText id={dataChecked} primary="Vacio" />
    </ListItem>
  );
};

export default ListEmply;

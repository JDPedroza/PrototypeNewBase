import React, { useContext } from "react";

//icons
import { Edit } from "@material-ui/icons";
//context
import RealEstateContext from "../context/realEstate/RealEstateContext";
//desing
import { IconButton, TableCell } from "@material-ui/core";

const CellEdit = ({ idxFiling }) => {
  const { handleOpenFilingEdit } = useContext(RealEstateContext);

  return (
    <TableCell>
      <IconButton
        size="small"
        onClick={() => {
          handleOpenFilingEdit(idxFiling);
        }}
      >
        <Edit />
      </IconButton>
    </TableCell>
  );
};

export default CellEdit;

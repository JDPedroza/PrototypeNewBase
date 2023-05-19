import { useEffect, useState } from "react";

//desing
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TextField,
} from "@material-ui/core";

//icons
import { Add, Delete } from "@material-ui/icons";

const ObservationForm = ({ changeData, dataFiling }) => {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    setObservations(dataFiling);
  }, [dataFiling]);

  return (
    <Grid item sm={12} md={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "90%" }}>Observaciones</TableCell>
            <TableCell style={{ width: "10%" }}>
              <IconButton
                onClick={() => {
                  let tempObservations = observations;
                  tempObservations.unshift("");
                  setObservations(tempObservations);
                  changeData({
                    target: { name: "observations", value: tempObservations },
                  });
                }}
              >
                <Add />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {observations.map((observation, idx) => (
            <TableRow key={`observation_${idx}`}>
              <TableCell>
                <TextField
                  fullWidth
                  type="text"
                  value={observation}
                  onChange={(e) => {
                    let tempObservations = observations;
                    tempObservations[idx] = e.target.value;
                    setObservations(tempObservations);
                    changeData({
                      target: { name: "observations", value: tempObservations },
                    });
                  }}
                />
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => {
                    let tempObservations = observations;
                    tempObservations.splice(idx, 1);
                    setObservations(tempObservations);
                    changeData({
                      target: { name: "observations", value: tempObservations },
                    });
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default ObservationForm;

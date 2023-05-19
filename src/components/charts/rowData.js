import { useState } from "react";

//desing
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";

//icons
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const RowData = ({ dataCharts, idx, attr_key_primary, start_colors }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={`row_attribute_primary_${idx}_${attr_key_primary}`}>
        <TableCell>
          <div
            style={{
              width: 20,
              height: 20,
              background: dataCharts.colorsPrimary[idx],
            }}
          />
        </TableCell>
        <TableCell>{attr_key_primary}</TableCell>
        <TableCell align="right">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
          }).format(Math.round(dataCharts.result.amount[attr_key_primary]))}
        </TableCell>
        <TableCell>
          {dataCharts.result.amount_percentage[attr_key_primary]}%
        </TableCell>
        <TableCell>{dataCharts.result.quantity[attr_key_primary]}</TableCell>
        <TableCell>
          {dataCharts.result.quantity_percentage[attr_key_primary]}%
        </TableCell>
        <TableCell>
          <IconButton
            onClick={() => {
              setOpen(!open);
            }}
            size="small"
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open}>
            <Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Cliente</TableCell>
                    <TableCell>Monto</TableCell>
                    <TableCell>Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataCharts.result.key_secundary[idx].map(
                    (attr_key_secondary, idx_secundary) => (
                      <TableRow
                        key={`data_attribute_secundary_${idx}_${attr_key_secondary}`}
                      >
                        <TableCell>
                          <div
                            style={{
                              width: 18,
                              height: 18,
                              background:
                                dataCharts.colorsSecundary[
                                  idx_secundary + start_colors
                                ],
                            }}
                          />
                        </TableCell>
                        <TableCell>{attr_key_secondary}</TableCell>
                        <TableCell align="right">
                          {new Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            maximumFractionDigits: 0,
                          }).format(
                            Math.round(
                              dataCharts.result.amount_clients[
                                attr_key_secondary
                              ]
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          {
                            dataCharts.result.quantity_clients[
                              attr_key_secondary
                            ]
                          }
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RowData;

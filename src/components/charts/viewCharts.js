import React, { useRef, useEffect, useState } from "react";

//packages
import c3 from "c3";
import * as d3 from "d3";

//desing
import {
  TableRow,
  TableCell,
  TableBody,
  Grid,
  TableContainer,
  Table,
  TableHead,
  Collapse,
  Box,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { ArrowDownward } from "@material-ui/icons";

function sumLengthPrevious(array, index) {
  let sum = 0;
  for (let i = 0; i < index; i++) {
    sum += array[i].length;
  }
  return sum;
}

function sortKeysDesc(keys, json) {
  keys.sort(function (a, b) {
    return json[b] - json[a];
  });
  return keys;
}

export const ViewChart = ({
  dataCharts,
  typeChart,
  typeData,
  dataChart,
  keyChart,
  titleChart,
  size,
  colors,
  groupsChart,
  colorsSecundary,
}) => {
  const tableRef = useRef(null);
  const [c3Chart, setC3Chart] = useState(null);
  const [short, setShort] = useState(false);

  useEffect(() => {
    let chart = null;
    if (typeChart === "pie" || typeChart === "donut") {
      chart = c3.generate({
        bindto: "#divCharts",
        size: {
          height: size,
          width: size,
        },
        data: {
          json: [dataChart],
          type: typeChart,
          keys: {
            value: keyChart,
          },
        },
        donut: {
          title:
            typeData === "amount"
              ? function () {
                  return "COP $" + d3.format(",.0f")(titleChart);
                }
              : titleChart,
        },
        color: {
          pattern: colors,
        },
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
      });
    } else if (typeChart === "bar" || typeChart === "stacked") {
      chart = c3.generate({
        bindto: "#divCharts",
        size: {
          height: size,
        },
        data: {
          json: [dataChart],
          groups: groupsChart,
          type: "bar",
          keys: {
            value: keyChart,
          },
          labels: {
            format:
              typeData === "amount"
                ? function (value) {
                    return (
                      (value / 1000000).toLocaleString("es-CO", {
                        maximumFractionDigits: 0,
                      }) + "M"
                    );
                  }
                : function (value) {
                    return value;
                  },
          },
        },
        zoom: {
          enabled: true,
        },
        bar: {
          width: {
            ratio: 1,
          },
        },
        axis: {
          x: {
            type: "category",
            categories: [""],
          },
          y: {
            tick: {
              format:
                typeData === "amount"
                  ? function (value) {
                      return "COP $" + d3.format(",.0f")(value);
                    }
                  : function (value) {
                      return value;
                    },
            },
          },
        },
        legend: {
          show: false,
        },
        tooltip: {
          show: true,
          grouped: false,
        },
        color: {
          pattern: typeChart === "bar" ? colors : colorsSecundary,
        },
      });
    }
    if (typeChart !== "stacked") {
      d3.select(tableRef.current)
        .selectAll("tr")
        .each(function () {
          const id = d3.select(this).attr("data-id");
          if (id !== null) {
            d3.select(this)
              .on("mouseover", function () {
                chart.focus(id);
              })
              .on("mouseout", function () {
                chart.revert();
              })
              .on("click", function () {
                chart.toggle(id);
              });
          }
        });
    } else {
      let tablesRowAll = [];
      for (let i = 0; i < dataCharts.result.key_primary.length; i++) {
        const rowsTable = d3.select(`#sub_table_${i}`).selectAll("tr");
        tablesRowAll.push(rowsTable);
      }

      tablesRowAll.forEach(function (table) {
        table.each(function () {
          const id = d3.select(this).attr("data-id");
          if (id !== null) {
            d3.select(this)
              .on("mouseover", function () {
                chart.focus(id);
              })
              .on("mouseout", function () {
                chart.revert();
              })
              .on("click", function () {
                chart.toggle(id);
              });
          }
        });
      });
    }
    setC3Chart(chart);
  }, [typeChart, typeData]);

  const shortChart = () => {
    if (short) {
      c3Chart.load({
        json: [dataChart],
        keys: {
          value: keyChart,
        },
      });
    } else {
      c3Chart.load({
        json: [dataChart],
        keys: {
          value: sortKeysDesc(keyChart, dataChart),
        },
      });
    }
  };

  return (
    <Grid container>
      <Grid
        item
        sm={12}
        md={6}
        style={{
          padding: 20,
          minHeight: "calc(100vh - 64px)",
          maxHeight: "calc(100vh - 64px)",
          overflow: "auto",
          display: "grid",
          alignContent: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 25, right: 25, zIndex: 200 }}>
          <Tooltip title="Ordenar">
            <IconButton onClick={shortChart}>
              <ArrowDownward />
            </IconButton>
          </Tooltip>
        </div>
        <div id="divCharts" />
      </Grid>
      <Grid
        item
        sm={12}
        md={6}
        style={{
          padding: 20,
          minHeight: "calc(100vh - 64px)",
          maxHeight: "calc(100vh - 64px)",
          overflow: "auto",
          display: "grid",
          alignContent: "center",
        }}
      >
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>{dataCharts.attribute}</TableCell>
                <TableCell align="center" colSpan={2}>
                  Monto / %
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Cantidad / %
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody ref={tableRef}>
              {dataCharts.result.key_primary.map((attr_key_primary, idx) => (
                <>
                  <TableRow
                    key={`${attr_key_primary}_${idx}`}
                    data-id={attr_key_primary}
                    id={`data_id_${idx}`}
                    style={{
                      cursor: "pointer",
                      borderBottom: `solid 5px ${dataCharts.colorsPrimary[idx]}`,
                    }}
                  >
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
                      }).format(
                        Math.round(dataCharts.result.amount[attr_key_primary])
                      )}
                    </TableCell>
                    <TableCell>
                      {dataCharts.result.amount_percentage[attr_key_primary]}%
                    </TableCell>
                    <TableCell>
                      {dataCharts.result.quantity[attr_key_primary]}
                    </TableCell>
                    <TableCell>
                      {dataCharts.result.quantity_percentage[attr_key_primary]}%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={true}
                        style={{
                          marginBottom: 10,
                          borderLeft: `solid 5px ${dataCharts.colorsPrimary[idx]}`,
                        }}
                      >
                        <Box>
                          <Table size="small" id={`sub_table_${idx}`}>
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
                                    data-id={attr_key_secondary}
                                  >
                                    <TableCell>
                                      <div
                                        style={{
                                          width: 18,
                                          height: 18,
                                          background:
                                            dataCharts.colorsSecundary[
                                              idx_secundary +
                                                sumLengthPrevious(
                                                  dataCharts.result
                                                    .key_secundary,
                                                  idx
                                                )
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

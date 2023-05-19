import { useContext, useEffect, useState } from "react";

//desing
import {
  Dialog,
  Tooltip,
  IconButton,
  Typography,
} from "@material-ui/core";

//icons
import {
  AttachMoney,
  BarChart,
  DonutLarge,
  Height,
  HorizontalSplit,
  PieChart,
} from "@material-ui/icons";

//context
import RealEstateContext from "../../context/realEstate/RealEstateContext";

//charts
import { ViewChart } from "./viewCharts";

const DialogCharts = () => {
  const [typeChart, setTypeChart] = useState("donut");
  const [typeData, setTypeData] = useState("amount");
  const [size, setSize] = useState(500);

  const { openCharts, handleOpenCharts, dataCharts } =
    useContext(RealEstateContext);

  useEffect(() => {
    setSize(window.innerHeight - 64 - 90);
  }, []);

  return (
    <Dialog
      maxWidth="xl"
      fullWidth
      open={openCharts}
      onClose={handleOpenCharts}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            minWidth: 144,
            minHeight: "calc(100vh - 64px)",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="BASAR GRAFICO EN VALOR">
            <IconButton onClick={() => setTypeData("amount")}>
              <AttachMoney
                style={typeData === "amount" ? { color: "77b516" } : {}}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="BASAR GRAFICO EN CANTIDAD">
            <IconButton onClick={() => setTypeData("quantity")}>
              <Height
                style={typeData === "quantity" ? { color: "77b516" } : {}}
              />
            </IconButton>
          </Tooltip>
          <Typography
            component="div"
            style={{
              background: "#04c689",
              height: "3px",
              width: "100%",
            }}
          />
          <Tooltip title="GRÁFICO DE BARRAS">
            <IconButton onClick={() => setTypeChart("bar")}>
              <BarChart
                style={typeChart === "bar" ? { color: "77b516" } : {}}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="GRÁFICO DE BARRAS APILADAS">
            <IconButton onClick={() => setTypeChart("stacked")}>
              <HorizontalSplit
                style={typeChart === "stacked" ? { color: "77b516" } : {}}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="GRÁFICO DE DONA">
            <IconButton onClick={() => setTypeChart("donut")}>
              <DonutLarge
                style={typeChart === "donut" ? { color: "77b516" } : {}}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="GRÁFICO DE PASTEL">
            <IconButton onClick={() => setTypeChart("pie")}>
              <PieChart
                style={typeChart === "pie" ? { color: "77b516" } : {}}
              />
            </IconButton>
          </Tooltip>
        </div>
        <div style={{ minWidth: "calc(100% - 144px)" }}>
          {Object.entries(dataCharts).length > 0 ? (
            <ViewChart
              dataCharts={dataCharts}
              typeChart={typeChart}
              typeData={typeData}
              dataChart={dataCharts[typeChart][typeData]}
              keyChart={dataCharts[typeChart].keys}
              titleChart={
                typeChart === "donut"
                  ? dataCharts[typeChart].title[typeData]
                  : ""
              }
              size={size}
              colors={dataCharts.colorsPrimary}
              groupsChart={
                typeChart === "stacked" ? dataCharts[typeChart].groups : []
              }
              colorsSecundary={dataCharts.colorsSecundary}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default DialogCharts;

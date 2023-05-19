import { useEffect } from "react";

//packages
import c3 from "c3";
import * as d3 from "d3";

export const C3PieDonutChart = ({
  typeChart,
  typeData,
  dataChart,
  keyChart,
  titleChart = "",
  size,
  colors
}) => {
  useEffect(() => {
    c3.generate({
      bindto: "#chartPieDonut",
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
    });
  }, []);

  return <div id="chartPieDonut"></div>;
};


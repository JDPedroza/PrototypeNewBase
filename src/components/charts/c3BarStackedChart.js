import { useEffect } from "react";

//packages
import c3 from "c3";
import * as d3 from "d3";

export const C3BarStackedChart = ({
  typeChart,
  typeData,
  dataChart,
  keyChart,
  groupsChart = [],
  size,
  colors,
  colorsSecundary = [],
}) => {
  useEffect(() => {
    c3.generate({
      bindto: "#chartBar",
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
        show: false,
      },
      color: {
        pattern: typeChart === "bar" ? colors : colorsSecundary,
      },
    });
  }, []);

  return <div id="chartBar" />;
};

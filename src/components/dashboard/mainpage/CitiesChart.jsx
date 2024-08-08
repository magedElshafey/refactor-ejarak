import React from "react";
import { useTranslation } from "react-i18next";
import ReactApexChart from "react-apexcharts";

const CitiesChart = ({ cities, labels }) => {
  const { i18n, t } = useTranslation();
  const options = {
    chart: {
      type: "donut",
    },
    colors: ["#FF697C", "#2CD889", "#FFC667", "#C5C5C5"],
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: "70%",
        },
      },
    },
    labels: labels,
    legend: {
      position: "bottom",
      fontSize: "15px",
      fontFamily: "cairo",
      markers: {
        width: 15,
        height: 15,
        offsetX: i18n.language === "ar" ? 3 : 0,
        shape: "donut",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 280,
          },
          legend: {
            position: "bottom",
            width: 280,
          },
        },
      },
    ],
  };
  return (
    <div className="w-full border border-[#7A8499] p-2 rounded-xl">
      <p className="font-bold">{t("Most visited cities")}</p>
      <div id="chart">
        {/* No need for inline height */}
        <ReactApexChart options={options} series={cities} type="donut" />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CitiesChart;

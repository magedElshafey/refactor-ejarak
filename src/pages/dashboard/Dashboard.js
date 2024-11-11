import React, { useState, useEffect } from "react";
import Spinner from "../../components/common/Spinner";
import { useQuery } from "react-query";
import { getGeneralData } from "../../services/get/dashboard/getGeneralData";
import StatisticsCard from "../../components/dashboard/common/StatisticsCard";
import img from "../../assets/supterVisor.svg";
import img2 from "../../assets/cities.svg";
import CitiesChart from "../../components/dashboard/mainpage/CitiesChart";
import { useTranslation } from "react-i18next";
import StatisticsChart from "../../components/dashboard/mainpage/StatisticsChart";
import ReactApexChart from "react-apexcharts";
const generateRealStatesData = (valuesResponse) => {
  const months = [
    "lastFiveMonths",
    "lastFourMonths",
    "lastThreeMonths",
    "lastTwoMonths",
    "lastMonth",
    "currentMonth",
  ];

  return months.map((month) => ({
    contract: valuesResponse?.[month]?.contract || 0,
    accepted: valuesResponse?.[month]?.accepted || 0,
    pending: valuesResponse?.[month]?.pending || 0,
    refused: valuesResponse?.[month]?.refused || 0,
  }));
};

const Dashboard = () => {
  const { i18n, t } = useTranslation();
  const [cities, setCities] = useState([]);
  const [labels, setLabels] = useState([]);
  const [totalCities, setTotalCities] = useState({});
  const { isLoading, data } = useQuery("general-data", getGeneralData, {
    onSuccess: (data) => {
      if (data?.data?.status) {
        setTotalCities(
          Object.keys(data?.data?.data?.cities?.number_of_realestate_in_city)
        );
      } else {
        setTotalCities({});
      }
    },
  });
  // names of cities
  useEffect(() => {
    if (data?.data?.data && data?.data?.data?.chartCities) {
      const bigCities = data?.data?.data.chartCities?.biggestCities?.map(
        (city) => city?.realties_count || 0
      );
      if (data?.data?.data?.chartCities?.otherCites) {
        bigCities?.push(data?.data?.data?.chartCities?.otherCites);
      }
      setCities(bigCities);
    }
  }, [data]);
  // names of cities
  useEffect(() => {
    if (
      data?.data?.data &&
      data?.data?.data?.chartCities &&
      i18n.language === "ar"
    ) {
      const citiesNames = data?.data?.data?.chartCities?.biggestCities?.map(
        (city) => city?.name?.ar || 0
      );
      if (data?.data?.data?.chartCities?.otherCites) {
        citiesNames?.push("المدن الأخري");
      }
      setLabels(citiesNames);
    }
    if (
      data?.data?.data &&
      data?.data?.data?.chartCities &&
      i18n.language === "en"
    ) {
      const citiesNames = data?.data?.data?.chartCities?.biggestCities?.map(
        (city) => city?.name?.en || 0
      );
      if (data?.data?.data?.chartCities?.otherCites) {
        citiesNames?.push("others cities");
      }
      setLabels(citiesNames);
    }
  }, [data, i18n]);
  const realStatesData = generateRealStatesData(
    data?.data?.data?.realstateStatus
  );
  const monthNames = {
    ar: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };
  const currentLanguage = i18n.language;
  const areaData = {
    series: [
      {
        data: realStatesData?.map((monthData) => monthData?.contract),
        name: t("contract houses"),
      },
      {
        data: realStatesData?.map((monthData) => monthData?.accepted),
        name: t("accepted houses"),
      },
      {
        data: realStatesData?.map((monthData) => monthData?.pending),
        name: t("pending houses"),
      },
      {
        data: realStatesData?.map((monthData) => monthData?.refused),
        name: t("rejected houses"),
      },
    ],
    options: {
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.0,
          opacityTo: 0.4,
        },
      },
      legend: {
        position: "right",
        fontSize: "15px",
        margin: "5px",
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      markers: {
        size: 0, // إخفاء النقاط
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      xaxis: {
        categories: [
          `${monthNames[currentLanguage][0]}`, // يناير
          `${monthNames[currentLanguage][2]}`, // مارس
          `${monthNames[currentLanguage][5]}`, // يونيو
          `${monthNames[currentLanguage][8]}`, // سبتمبر
          `${monthNames[currentLanguage][11]}`, // ديسمبر
        ],
        tickAmount: 5, // عدد الفواصل بين الشهور
        axisTicks: {
          show: false, // إخفاء الفواصل على محور x
        },
        labels: {
          show: true, // إبقاء أسماء الشهور
        },

        endOnTick: true, // لضمان الانتهاء عند ديسمبر
      },
      yaxis: {
        min: 0,
        max: 12,
        tickAmount: 4,
      },
      colors: ["#008060", "#2CD889", "#FFA84A", "#F7617D"],
      tooltip: {
        x: {
          formatter: function (value) {
            // استخدم index لتحديد اسم الشهر
            const monthIndex = parseInt(value); // تحويل القيمة إلى رقم
            return monthNames[currentLanguage][monthIndex] || ""; // عرض اسم الشهر
          },
        },
      },
    },
  };

  const { options, series } = areaData;
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-7 mb-8">
            <StatisticsCard
              img={img}
              title="Moderators"
              bgColor="bg-[#AEF0D2]"
              number={data?.data?.data?.user?.admins}
              path="/dashboard/users"
              state={2}
            />
            <StatisticsCard
              img={img}
              title="users"
              bgColor="bg-[#FFF7E9]"
              number={data?.data?.data?.user?.users}
              path="/dashboard/users"
            />
            <StatisticsCard
              img={img}
              title="owners"
              bgColor="bg-[#FBE7E6]"
              number={data?.data?.data?.user?.owners}
              path="/dashboard/users"
              state={3}
            />

            <StatisticsCard
              img={img}
              title="tenants"
              bgColor="bg-[#FFF7E9]"
              number={data?.data?.data?.user?.tenants}
              path="/dashboard/users"
              state={4}
            />
            <StatisticsCard
              img={img2}
              title="houses number"
              bgColor="bg-[#FFF7E9]"
              number={data?.data?.data?.Realestates?.Realestates}
              path="/dashboard/realstates"
            />
            <StatisticsCard
              img={img2}
              title="accepted houses number"
              bgColor="bg-[#EEF1FF]"
              number={data?.data?.data?.Realestates?.accepted}
              path="/dashboard/realstates"
              state="accepted"
            />
            <StatisticsCard
              img={img2}
              title="refused houses number"
              bgColor="bg-[#FBE7E6]"
              number={data?.data?.data?.Realestates?.refused}
              path="/dashboard/realstates"
              state="refused"
            />
            <StatisticsCard
              img={img2}
              title="booking"
              bgColor="bg-[#EEF1FF]"
              number={data?.data?.data?.Booking?.Booking}
              path="/dashboard/reservations"
            />
          </div>
          <div className="flex gap-3 md:gap-5 lg:gap-6 justify-center flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/3">
              <CitiesChart cities={cities} labels={labels} />
            </div>
            <div className="w-full lg:w-2/3">
              <StatisticsChart
                totalCities={totalCities}
                data={data?.data?.data}
              />
            </div>
          </div>
          <div className="border border-[#7A8499] p-2 rounded-xl mt-8">
            <span className="font-bold text-xl text-center px-2">
              {t("realstates")}
            </span>
            <div id="chart" className=" h-[280px]">
              <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={280}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

import React from "react";
import Spinner from "../../components/common/Spinner";
import { useQuery } from "react-query";
import { getGeneralData } from "../../services/get/dashboard/getGeneralData";
import StatisticsCard from "../../components/dashboard/common/StatisticsCard";
import img from "../../assets/supterVisor.svg";
import img2 from "../../assets/cities.svg";
const Dashboard = () => {
  const { isLoading, data } = useQuery("general-data", getGeneralData);
  console.log("data from dashboard : ", data?.data?.data);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-7">
            <StatisticsCard
              img={img}
              title="Moderators"
              bgColor="bg-[#AEF0D2]"
              number={data?.data?.data?.user?.admins}
            />
            <StatisticsCard
              img={img}
              title="users"
              bgColor="bg-[#FFF7E9]"
              number={data?.data?.data?.user?.users}
            />
            <StatisticsCard
              img={img}
              title="owners"
              bgColor="bg-[#FBE7E6]"
              number={data?.data?.data?.user?.owners}
            />

            <StatisticsCard
              img={img}
              title="tenants"
              bgColor="bg-[#FFF7E9]"
              number={data?.data?.data?.user?.tenants}
            />
            <StatisticsCard
              img={img2}
              title="houses number"
              bgColor="bg-[#FFF7E9]"
              number={data?.data?.data?.Realestates?.Realestates}
            />
            <StatisticsCard
              img={img2}
              title="accepted houses number"
              bgColor="bg-[#EEF1FF]"
              number={data?.data?.data?.Realestates?.accepted}
            />
            <StatisticsCard
              img={img2}
              title="refused houses number"
              bgColor="bg-[#FBE7E6]"
              number={data?.data?.data?.Realestates?.refused}
            />
            <StatisticsCard
              img={img2}
              title="booking"
              bgColor="bg-[#EEF1FF]"
              number={data?.data?.data?.Booking?.Booking}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

import React, { useState } from "react";
import Spinner from "../../components/common/Spinner";
import { useQuery } from "react-query";
import { getPackages } from "../../services/get/getPackages";
import { useTranslation } from "react-i18next";
import PackageCard from "../../components/package/PackageCard";
const CreateElectronicContract = () => {
  const { t } = useTranslation();
  const [dataWhenSubscriped, setDataWhenSubscriped] = useState([]);
  const { isLoading, data } = useQuery("packages", getPackages, {
    onSuccess: (data) => {
      if (data?.data?.status) {
        const newData = data?.data?.data?.packages?.filter(
          (item) => item?.id !== data?.data?.data?.subscription[0]?.package?.id
        );
        setDataWhenSubscriped(newData);
      }
    },
  });
  const isSuscribed = data?.data?.data?.subscription?.length;
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <h2 className="font-bold text-lg lg:text-2xl text-textColor mb-5">
            {t("Creating the contract (via the electronic agent)")}
          </h2>
          <div className="bg-white p-3 shadow-2xl rounded-lg">
            <h4 className="font-semibold lg:text-lg mb-8 ">
              {t("Choose the package that suits you")}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {isSuscribed ? (
                <>
                  {dataWhenSubscriped?.map((item, index) => (
                    <div key={index}>
                      <PackageCard
                        key={index}
                        data={item}
                        btnBg="bg-maincolorgreen"
                        isActive={false}
                        shadow="shadow-xl"
                        showActivateBtn={false}
                      />
                    </div>
                  ))}
                  <PackageCard
                    data={data?.data?.data?.subscription[0]?.package}
                    btnBg="bg-maincolorgreen"
                    isActive={true}
                    shadow="shadow-xl"
                    remainingContracts={
                      data?.data?.data?.subscription[0]?.no_contracts
                    }
                  />
                </>
              ) : (
                data?.data?.data?.packages.map((i, ind) => (
                  <PackageCard
                    key={ind}
                    data={i}
                    btnBg="bg-maincolorgreen"
                    isActive={false}
                    shadow="shadow-xl"
                    showActivateBtn={true}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateElectronicContract;

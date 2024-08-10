import React, { useState } from "react";
import Spinner from "../../components/common/Spinner";
import { useQuery } from "react-query";
import { getCities } from "../../services/get/dashboard/getCities";
import MainSelect from "../../components/common/inputs/MainSelect";
import { useTranslation } from "react-i18next";
import AddCityBtn from "../../components/dashboard/city/AddCityBtn";
import RemoveCityBtn from "../../components/dashboard/city/RemoveCityBtn";
import AddCityForm from "../../components/dashboard/city/AddCityForm";
import EditCityBtn from "../../components/dashboard/city/EditCityBtn";
import EditCityForm from "../../components/dashboard/city/EditCityForm";
const Cities = () => {
  const { t } = useTranslation();
  const { isLoading, data } = useQuery("cities", getCities);
  const [cityId, setCityId] = useState("");
  const handleCitiyChange = (opt) => setCityId(opt.id);
  const [showAddCityForm, setShowAddCityForm] = useState(false);
  const [showEditCityForm, setShowEditCityForm] = useState(false);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <div className="flex items-center gap-4 md:gap-8 lg:gap-12 flex-col md:flex-row">
            <div className="md:w-1/2">
              <MainSelect
                onSelect={handleCitiyChange}
                label="region"
                options={data?.data?.data}
                value={
                  cityId
                    ? data?.data?.data?.find((item) => item.id === +cityId).name
                    : cityId
                }
              />
            </div>
            <div className="md:w-1/2 flex items-center gap-3 flex-wrap md:mt-8">
              <AddCityBtn setShowAddCityForm={setShowAddCityForm} />
              <EditCityBtn
                setShowEditCityForm={setShowEditCityForm}
                id={cityId}
              />
              <RemoveCityBtn id={cityId} setCityId={setCityId} />
            </div>
          </div>
        </div>
      )}
      <AddCityForm
        showAddCityForm={showAddCityForm}
        setShowAddCityForm={setShowAddCityForm}
      />
      <EditCityForm
        showEditCityForm={showEditCityForm}
        setShowEditCityForm={setShowEditCityForm}
        id={cityId}
      />
    </>
  );
};

export default Cities;

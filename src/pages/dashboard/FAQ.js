import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import Spinner from "../../components/common/Spinner";
import { getFaqDetails } from "../../services/get/dashboard/getFaqDetails";
const FAQ = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoading, data } = useQuery(["faq-details", params.id], () =>
    getFaqDetails(params.id)
  );
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <p className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-maincolorgreen mb-8">
            {t("faq details")}
          </p>
          <p>fsdfsfds</p>
        </div>
      )}
    </>
  );
};

export default FAQ;

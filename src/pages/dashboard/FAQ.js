import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import Spinner from "../../components/common/Spinner";
import { getFaqDetails } from "../../services/get/dashboard/getFaqDetails";
import MainInput from "../../components/common/inputs/MainInput";
const FAQ = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoading, data } = useQuery(["faq-details", params.id], () =>
    getFaqDetails(params.id)
  );
  console.log("Data from faq details", data?.data?.data);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <p className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-maincolorgreen mb-8">
            {t("faq details")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="rounded-lg p-4 flex items-center border border-textColor">
              <div>
                <p className="text-textColor text-md lg:text-lg font-semibold mb-3">
                  {t("question in arabic")}
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.data?.translations?.question.ar,
                  }}
                ></p>
              </div>
            </div>
            <div className="rounded-lg p-4 flex items-center border border-textColor">
              <div>
                <p className="text-textColor text-md lg:text-lg font-semibold mb-3">
                  {t("question in english")}
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.data?.translations?.question.en,
                  }}
                ></p>
              </div>
            </div>
            <div className="rounded-lg p-4 flex items-center border border-textColor">
              <div>
                <p className="text-textColor text-md lg:text-lg font-semibold mb-3">
                  {t("answer in arabic")}
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.data?.translations?.answer.ar,
                  }}
                ></p>
              </div>
            </div>
            <div className="rounded-lg p-4 flex items-center border border-textColor">
              <div>
                <p className="text-textColor text-md lg:text-lg font-semibold mb-3">
                  {t("answer in english")}
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.data?.translations?.answer.en,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQ;

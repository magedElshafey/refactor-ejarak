import React from "react";
import { useQuery } from "react-query";
import { getPrivacy } from "../../services/get/getPrivacy";
import Spinner from "../../components/common/Spinner";
import { useTranslation } from "react-i18next";
const Terms = () => {
  const { isLoading, data } = useQuery(["terms"], getPrivacy);
  const { t } = useTranslation();
  const content = data?.data?.data?.find(
    (item) => item.key === "terms_and_conditions"
  );
  const content2 = data?.data?.data?.find((item) => item.key === "policy");
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-5">
          <div className="mb-5">
            <p className="text-lg mb-3 md:text-xl lg:text-2xl xl:text-3xl font-bold text-textColor">
              {t("termsAndConditions")}
            </p>
            <p
              className="mb-8 leading-7 text-[#4D5F65]"
              dangerouslySetInnerHTML={{ __html: content?.value }}
            ></p>
          </div>
          <p className="text-lg mb-3 md:text-xl lg:text-2xl xl:text-3xl font-bold text-textColor">
            {t("privacy Policy")}
          </p>
          <p
            className="mb-8 leading-7 text-[#4D5F65]"
            dangerouslySetInnerHTML={{ __html: content2?.value }}
          ></p>
        </div>
      )}
    </>
  );
};

export default Terms;

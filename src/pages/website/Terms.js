import React from "react";
import Spinner from "../../components/common/Spinner";
import { useTranslation } from "react-i18next";
import useFilteredContent from "../../hooks/api/useFilterdSettings";

const Terms = () => {
  const { t } = useTranslation();

  const { isLoading: loadingTerms, data: content } = useFilteredContent(
    "terms_and_conditions"
  );
  return (
    <>
      {loadingTerms ? (
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
        </div>
      )}
    </>
  );
};

export default Terms;

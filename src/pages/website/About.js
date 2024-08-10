import React from "react";

import Spinner from "../../components/common/Spinner";
import { useTranslation } from "react-i18next";
import useFilteredContent from "../../hooks/api/useFilterdSettings";
const About = () => {
  const { t } = useTranslation();

  const { isLoading, data: content } = useFilteredContent("about_ejark");
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-5">
          <p className="text-lg mb-3 md:text-xl lg:text-2xl xl:text-3xl font-bold text-textColor">
            {t("about us")}
          </p>
          <p
            className="mb-8 leading-7 text-[#4D5F65]"
            dangerouslySetInnerHTML={{ __html: content?.value }}
          ></p>
        </div>
      )}
    </>
  );
};

export default About;

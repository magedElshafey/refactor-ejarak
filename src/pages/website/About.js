import React from "react";
import { useQuery } from "react-query";
import { getPrivacy } from "../../services/get/getPrivacy";
import Spinner from "../../components/common/Spinner";
import { useTranslation } from "react-i18next";
const About = () => {
  const { isLoading, data } = useQuery(["privacy"], getPrivacy);
  const { t } = useTranslation();

  const content = data?.data?.data?.find((item) => item.key === "about_ejark");
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

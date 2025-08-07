import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/ejark green.png";
const Meta = ({ title, desc, fav }) => {
  const { t } = useTranslation();
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title ? title : t("ejarak")}</title>
      <meta name="description" content={desc ? desc : t("infooooo")} />
      <link rel="icon" href={fav ? fav : logo} />
      {/* <link rel="canonical" href="http://mysite.com/example" /> */}
    </Helmet>
  );
};

export default Meta;

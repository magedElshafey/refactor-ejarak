import React from "react";
import logo from "../../../assets/logo footer.png";
import Logo from "../../../components/common/Logo";
import { useNavigate } from "react-router-dom";
import {
  appDetails,
  navLinks,
  aboutUs,
  footerDetails,
} from "../../../data/data";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = ({ isHome }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { ejarakLogin } = useSelector((state) => state.authSlice);
  const auth = useSelector((state) => state.authSlice);
  const isLogin = ejarakLogin;
  const type = auth?.userData?.account?.type;
  const { userData } = useSelector((state) => state.authSlice);
  const role = userData?.account?.type;
  return (
    <>
      {isHome ? (
        <div className="w-screen p-3 flex items-center bg-secondcolorgreen">
          <div className="container mx-auto px-8">
            <div className="w-full flex justify-center flex-col items-center gap-3 mb-8">
              <Logo img={logo} />
              {/* <p className="text-white">
                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
                هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو
                العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف
              </p> */}
            </div>
            <div
              className={`grid grid-cols-1 w-full justify-center ${
                ejarakLogin ? "lg:grid-cols-4" : "lg:grid-cols-3"
              } gap-4 lg:gap-16`}
            >
              <div>
                <p className="text-white font-bold text-md md:text-lg lg:text-xl xl:text-2xl mb-3">
                  {t(appDetails.title)}
                </p>
                {appDetails.details.map((item, index) => (
                  <a
                    key={index}
                    href={item.path}
                    target="_blank"
                    rel="noreferrer"
                    className="block mb-3"
                  >
                    <img alt="application" src={item.img} />
                  </a>
                ))}
              </div>
              <div>
                <p className="text-white font-bold text-md md:text-lg lg:text-xl xl:text-2xl mb-3">
                  {t("important links")}
                </p>
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    key={index}
                    onClick={(e) =>
                      item.onClick && item.onClick(e, isLogin, navigate, type)
                    }
                    className={`w-fit flex items-center gap-2 mb-4 footer text-white`}
                  >
                    <p>
                      {i18n.language === "ar" ? item.arTitle : item.enTitle}
                    </p>
                  </NavLink>
                ))}
              </div>
              <div>
                <p className="text-white font-bold text-md md:text-lg lg:text-xl xl:text-2xl mb-3">
                  {t("about us")}
                </p>
                {aboutUs.map((item, index) => (
                  <NavLink
                    to={item.path}
                    key={index}
                    onClick={(e) =>
                      item.onClick && item.onClick(e, isLogin, navigate, type)
                    }
                    className={`w-fit flex items-center gap-2 mb-4 footer text-white`}
                  >
                    <p>{t(item.title)}</p>
                  </NavLink>
                ))}
              </div>
              {ejarakLogin ? (
                <div>
                  {role === "owner" || role === "tenant" ? (
                    <p className="text-white font-bold text-md md:text-lg lg:text-xl xl:text-2xl mb-3">
                      {t("account")}
                    </p>
                  ) : null}

                  {footerDetails
                    ?.filter((item) => item.role.includes(role))
                    .map((item, index) => (
                      <NavLink
                        to={item.path}
                        key={index}
                        className={`w-fit flex items-center gap-2 mb-4 footer text-white`}
                      >
                        <p>{t(item.title)}</p>
                      </NavLink>
                    ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen p-3 flex items-center footerr mt-8">
          <div className="container mx-auto px-8">
            <div className="w-full flex justify-center flex-col items-center gap-3 mb-8  mt-24 md:mt-20 lg:mt-8">
              <Logo img={logo} />
            </div>
            <div
              className={`grid grid-cols-1 ${
                ejarakLogin ? "lg:grid-cols-4" : "lg:grid-cols-3"
              } gap-4 lg:gap-16`}
            >
              <div>
                <p className="text-white font-bold text-md md:text-lg lg:text-xl xl:text-2xl mb-3">
                  {t(appDetails.title)}
                </p>
                {appDetails.details.map((item, index) => (
                  <a
                    key={index}
                    href={item.path}
                    target="_blank"
                    rel="noreferrer"
                    className="block mb-3"
                  >
                    <img alt="application" src={item.img} />
                  </a>
                ))}
              </div>
              <div>
                <p className="text-white font-bold text-md md:text-lg lg:text-xl xl:text-2xl mb-3">
                  {t("important links")}
                </p>
                {navLinks.map((item, index) => (
                  <NavLink
                    onClick={(e) =>
                      item.onClick && item.onClick(e, isLogin, navigate, type)
                    }
                    to={item.path}
                    key={index}
                    className={`w-fit flex items-center gap-2 mb-4 footer text-white`}
                  >
                    <p>
                      {i18n.language === "ar" ? item.arTitle : item.enTitle}
                    </p>
                  </NavLink>
                ))}
              </div>
              <div>
                <p className="text-white font-bold text-md md:text-lg lg:text-xl xl:text-2xl mb-3">
                  {t("about us")}
                </p>
                {aboutUs.map((item, index) => (
                  <NavLink
                    to={item.path}
                    key={index}
                    onClick={(e) =>
                      item.onClick && item.onClick(e, isLogin, navigate, type)
                    }
                    className={`w-fit flex items-center gap-2 mb-4 footer text-white`}
                  >
                    <p>{t(item.title)}</p>
                  </NavLink>
                ))}
              </div>
              {ejarakLogin ? (
                <div>
                  {role === "owner" || role === "tenant" ? (
                    <p className="text-white font-bold text-md md:text-lg lg:text-xl xl:text-2xl mb-3">
                      {t("account")}
                    </p>
                  ) : null}
                  {footerDetails
                    ?.filter((item) => item.role.includes(role))
                    .map((item, index) => (
                      <NavLink
                        to={item.path}
                        key={index}
                        className={`w-fit flex items-center gap-2 mb-4 footer text-white`}
                      >
                        <p>{t(item.title)}</p>
                      </NavLink>
                    ))}
                </div>
              ) : null}
              {/* <div>
                <p className="text-white font-bold text-md md:text-lg lg:text-xl xl:text-2xl mb-3">
                  {t(followUs.title)}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {followUs.details.map((item, index) => (
                    <a
                      key={index}
                      href={item.path}
                      target="_blank"
                      rel="noreferrer"
                      className="block mb-3 text-white"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;

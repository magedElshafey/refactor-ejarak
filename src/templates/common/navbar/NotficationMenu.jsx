import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../../hooks/useClickOutside";
import { FaBell } from "react-icons/fa";
import { getAllNotfications } from "../../../services/get/getAllNotfications";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ShowNotfications from "../../../components/common/notfications/ShowNotfications";
const NotficationMenu = ({ bg, isDashboard }) => {
  const { i18n, t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const menu = useRef(null);
  const closeMenu = () => setShowMenu(false);
  useClickOutside(menu, closeMenu);
  const { isLoading, data, refetch } = useQuery(
    "all-notfications",
    getAllNotfications,
    {
      staleTime: "Infinity",
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div
      onClick={() => setShowMenu(!showMenu)}
      ref={menu}
      className="cursor-pointer relative"
    >
      {isDashboard ? (
        <div className="w-10 h-10 rounded-[50%] flex items-center justify-center border text-maincolorgreen">
          <FaBell size={20} />
          {data && data?.data?.un_seen ? (
            <div className=" absolute bottom-0 left-0 w-3 h-3 md:w-5 md:h-5 flex items-center justify-center bg-maincolorgreen text-white rounded-[50%] text-xs md:text-base">
              <p> {data?.data?.un_seen}</p>
            </div>
          ) : null}
        </div>
      ) : (
        <div
          className={`w-8 h-8 md:w-12 md:h-12 md:p-2 flex items-center rounded-md justify-center md:border  ${
            bg
              ? `${bg} text-slate-500`
              : "md:border-white text-white bg-transparent"
          }`}
        >
          <FaBell size={20} />
        </div>
      )}

      <ul
        className={`absolute duration-300 min-w-[280px] border ${
          i18n.language === "ar" ? "right-[-100px]" : "left-[-100px]"
        } ${
          isLoading || !data ? "bottom-[-50px]" : "top-[105%]"
        }  bg-white shadow-lg z-50 p-3 rounded-md ${
          showMenu ? "block" : "hidden"
        }`}
      >
        {isLoading || !data ? (
          <div className="spinner3 text-center mx-auto"></div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-textColor mb-5">
              <p>{t("notfications")}</p>
              <Link to="/website/all-notfications">
                {t("all notfications")}
              </Link>
            </div>
            {data?.data?.data?.slice(0, 5).map((item, index) => (
              <ShowNotfications
                refetch={refetch}
                isMenu={true}
                key={index}
                data={item}
              />
            ))}
          </div>
        )}
      </ul>
    </div>
  );
};

export default NotficationMenu;

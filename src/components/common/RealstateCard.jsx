import React from "react";
import { FaStar } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../utils/formateDateTime";
import newIcon from "../../assets/fire.svg";
import { IoLocationSharp, IoBedOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import { BiArea } from "react-icons/bi";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import useWishlist from "../../hooks/useWishlist";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const RealStateCard = ({ data, dep }) => {
  const { t, i18n } = useTranslation();
  const { ejarakLogin } = useSelector((state) => state.authSlice);
  const { handleClick } = useWishlist(data.id, dep);
  return (
    <div className="w-full bg-white rounded-xl shadow-xl mb-5 md:mb-6 lg:mb-8">
      <div className="flex items-center gap-3 justify-end mb-5 lg:mb-2">
        <div className="flex items-center gap-1">
          {data?.avg_rating ? (
            <p className="  text-secondcolorgreen font-medium">
              ({data?.avg_rating.toFixed(1)})
            </p>
          ) : null}
          {[...Array(5)].map((_, index) => {
            return (
              <FaStar
                key={index}
                size={15}
                style={{
                  color:
                    index < Math.round(data.avg_rating) ? "#007D56" : "#ccc",
                }}
              />
            );
          })}
        </div>
        <div
          className={` text-sm  text-white bg-[#4D5F65] py-1 md:py-2 px-4 ${
            i18n.language
              ? "rounded-tl-lg rounded-br-lg"
              : "rounded-tr-lg rounded-bl-lg"
          }  text-[.5rem] md:text-sm `}
        >
          <p dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            {formatDateTime(data?.updated_at)}
          </p>
        </div>
      </div>
      <div className="px-4 mb-3 ">
        <div className="flex items-center justify-between flex-col xl:flex-row gap-3 xl:gap-0">
          <div className="flex-1 flex flex-col lg:flex-row gap-2">
            <div className="relative">
              <img
                src={data.images[0]}
                alt=""
                className="rounded-lg w-full md:min-w-[260px] md:max-w-[270px] min-h-[230px] max-h-[240px] lg:mb-0 object-cover z-10 "
              />
              {data?.special || data?.year_of_construction <= 2 ? (
                <div
                  className={` rounded-sm p-2 absolute top-0  flex items-center justify-center gap-2   bg-white  ${
                    i18n.language === "ar" ? "right-0" : "left-0"
                  }`}
                >
                  {data?.year_of_construction <= 2 ? (
                    <img
                      alt="special"
                      src={newIcon}
                      style={{
                        width: "15px",
                      }}
                    />
                  ) : null}
                  {data?.special ? (
                    <FaStar style={{ color: "gold", width: "20px" }} />
                  ) : null}
                </div>
              ) : null}
            </div>
            <div>
              <Link
                to={`/website/realstate/${data.id}`}
                className="block font-bold lg:text-lg mb-4 md:w-[80%] text-maincolorgreen underline"
              >
                {data.name}
              </Link>
              <p className="text-slate-600 md:w-[80%] mb-6 md:mb-12 lg:mb-24">
                {data.notes.substr(0, 250)}
                {data.notes.length > 250 ? "..." : null}
              </p>
              <div className="flex  gap-1 text-slate-600 flex-col md:flex-row">
                <IoLocationSharp />
                <p>
                  {data?.city?.name} - {data?.region} -{data?.address}
                </p>
              </div>
            </div>
          </div>
          <div className="text-xl lg:text-2xl l  text-[#4D5F65]">
            {t("price")}
            <p className="text-2xl lg:text-3xl font-extrabold text-secondcolorgreen">
              {parseFloat(data.price).toFixed(0)} {t("currency")}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#f5f3f3] rounded-xl p-3 px-6 flex lg:items-center justify-around gap-4 flex-col lg:flex-row text-nowrap">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6  ">
          <div className="flex items-center gap-1">
            <BsBuildings size={18} />
            <p className="lg:text-sm">{t("realstate type")} : </p>
            <p className="font-bold">{data?.category?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <BsBuildings size={18} />
            <p className="lg:text-sm">{t("subCategory type")} : </p>
            <p className="font-bold">{data?.sub_category?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <BiArea size={18} />
            <p className="lg:text-sm">{t("area")} : </p>
            <p className="font-bold">
              {parseFloat(data.area).toFixed(0)} {t("m")}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <IoBedOutline size={18} />
            <p className="lg:text-sm">{t("rooms")} : </p>
            <p className="font-bold"> {data.rooms_count}</p>
          </div>
          <div className="flex items-center gap-1">
            <IoBedOutline size={18} />
            <p className="lg:text-sm">{t("bathRooms")} : </p>
            <p className="font-bold"> {data.bathrooms_count}</p>
          </div>
        </div>
        <div>
          {ejarakLogin ? (
            data?.is_fav ? (
              <MdFavorite
                onClick={handleClick}
                className="text-3xl text-maincolorgreen cursor-pointer "
              />
            ) : (
              <MdFavoriteBorder
                onClick={handleClick}
                className="text-3xl hover:text-[#00AA4B] cursor-pointer "
              />
            )
          ) : (
            <MdFavoriteBorder
              onClick={handleClick}
              className="text-3xl hover:text-[#00AA4B] cursor-pointer "
            />
          )}
          {/* {data?.is_fav ? (
            <MdFavorite
              onClick={handleClick}
              className="text-3xl text-maincolorgreen cursor-pointer "
            />
          ) : (
            <MdFavoriteBorder
              onClick={handleClick}
              className="text-3xl hover:text-[#00AA4B] cursor-pointer "
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default RealStateCard;

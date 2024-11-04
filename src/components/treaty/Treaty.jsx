import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import MainBtn from "../common/buttons/MainBtn";
import { useDispatch } from "react-redux";
import { addToken, login } from "../../store/auth";
const Treaty = ({ showTreaty, setShowTreaty }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = localStorage.getItem("treaty-user")
    ? JSON.parse(localStorage.getItem("treaty-user"))
    : null;
  const token = localStorage.getItem("treaty-token")
    ? JSON.parse(localStorage.getItem("treaty-token"))
    : null;
  const dispatch = useDispatch();
  const handleAccepted = () => {
    dispatch(login(user));
    dispatch(addToken(token));
    setShowTreaty(false);
    navigate("/website/all-realstates");
    localStorage.removeItem("treaty-token");
    localStorage.removeItem("treaty-user");
  };
  return (
    <div
      className={`duration-300 fixed w-screen h-screen bg-black bg-opacity-60 top-0 ${
        showTreaty ? "left-0" : "left-[-300%]"
      }`}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[280px] md:w-[350px] lg:w-[750px] bg-white shadow-xl rounded-lg p-4">
          <p className="text-lg md:text-xl font-bold text-textColorcolorgreen text-center mb-6">
            معاهدة
          </p>
          <p className="font-bold mb-3 text-md md:text-lg text-textColor">
            بسم الله الرحمن الرحيم
          </p>
          <p className=" font-medium text-textColor mb-6">
            قال الله تعالى "وَأَوْفُوا بِعَهْدِ اللَّهِ إِذَا عَاهَدتُّمْ وَلَا
            تَنقُضُوا الْأَيْمَانَ بَعْدَ تَوْكِيدِهَا وَقَدْ جَعَلْتُمُ اللَّهَ
            عَلَيْكُمْ كَفِيلًا ۚ إِنَّ اللَّهَ يَعْلَمُ مَا تَفْعَلُونَ"
          </p>
          <p className="font-bold text-center mb-4">{t("treaty")}</p>

          <p className=" text-red-600 mb-4 ">{t("treatyNote")}</p>
          <div className=" flex items-center justify-center ">
            <div className="w-[250px] md:w-[320px]">
              <MainBtn text={t("acceptt")} action={handleAccepted} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treaty;

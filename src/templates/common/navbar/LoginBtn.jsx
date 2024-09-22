import React, { useState, useRef } from "react";
import { CiUser } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import useClickOutside from "../../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../../services/get/handleLogout";
import { useMutation } from "react-query";
import { logout } from "../../../store/auth";
import Swal from "sweetalert2";
const LoginBtn = ({ bg, isDashboard }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { ejarakLogin, userData } = useSelector((state) => state.authSlice);
  const [showMenu, setShowMenu] = useState(false);
  const toggleShowMenu = () => setShowMenu(!showMenu);
  const ref = useRef(null);
  useClickOutside(ref, () => setShowMenu(false));
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(handleLogout, {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        dispatch(logout());
        navigate("/");
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const handleClick = () => mutate();
  return (
    <>
      {!ejarakLogin ? (
        <>
          <Link
            to="/auth/login"
            className=" items-center hidden md:flex justify-center gap-1 bg-maincolorgreen text-white py-3 rounded-md w-[150px] "
          >
            <CiUser size={20} />
            <p>{t("login")}</p>
          </Link>
          <Link
            to="/auth/login"
            className={`md:hidden ${bg ? "" : "text-white"}`}
          >
            <CiUser size={20} />
          </Link>
        </>
      ) : (
        <div
          ref={ref}
          onClick={toggleShowMenu}
          className={`relative   cursor-pointer ${
            bg ? `${bg} text-slate-500` : " text-white bg-transparent"
          }`}
        >
          <div
            className={`w-full flex items-center gap-3 p-2 rounded-lg ${
              bg ? "" : "border border-white "
            }`}
          >
            {isDashboard ? (
              <>
                <p className="hidden lg:block bg-slate-600 w-[2px] h-[50px]"></p>
                <IoMdArrowDropdown size={20} />
                <div className="hidden lg:flex flex-col items-center">
                  <p className={` font-normal md:font-bold `}>
                    {userData?.name}
                  </p>
                  <p className=" lowercase">{userData?.email?.address}</p>
                </div>
                <img
                  alt="avtar-img"
                  src={userData.avatar?.original}
                  className="w-10 h-10 rounded-[50%] object-cover"
                />
              </>
            ) : (
              <>
                <IoMdArrowDropdown size={20} />
                <img
                  alt="avtar-img"
                  src={userData.avatar?.original}
                  className="w-6 h-6 lg:w-10 lg:h-10 rounded-[50%] object-cover"
                />
                <p className={` font-normal md:font-bold`}>{userData?.name}</p>
              </>
            )}
          </div>
          <ul
            className={`absolute bottom-[-70px] ${
              i18n.language === "ar" ? "left-[30px]" : "right-[30px]"
            } text-start bg-white shadow-lg rounded-md p-3 z-40 duration-300 min-w-[180px] ${
              showMenu ? "block" : "hidden"
            }`}
          >
            {userData?.account?.type === "owner" ||
            userData?.account?.type === "tenant" ? (
              <li
                className=" cursor-pointer mb-2 text-black"
                onClick={() => {
                  navigate("/website/my-account");
                  setShowMenu(false);
                }}
              >
                {t("account")}
              </li>
            ) : (
              <li
                className=" cursor-pointer mb-2 text-black"
                onClick={() => {
                  navigate("/dashboard/dashboard");
                  setShowMenu(false);
                }}
              >
                {t("dashboard")}
              </li>
            )}

            <li className=" cursor-pointer text-black ">
              <button
                onClick={() => {
                  handleClick();
                  setShowMenu(false);
                }}
                disabled={isLoading}
              >
                {t("logout")}
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default LoginBtn;

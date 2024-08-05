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
const LoginBtn = ({ bg }) => {
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
        <Link
          to="/auth/login"
          className="flex items-center justify-center gap-2 bg-maincolorgreen text-white py-3 rounded-md w-[150px] "
        >
          <CiUser size={20} />
          <p>{t("login")}</p>
        </Link>
      ) : (
        <div
          ref={ref}
          onClick={toggleShowMenu}
          className={`relative   cursor-pointer ${
            bg ? `${bg} text-slate-500` : " text-white bg-transparent"
          }`}
        >
          <div
            className={`w-full flex items-center gap-1 p-2 rounded-lg ${
              bg ? "" : " border border-white "
            }`}
          >
            <IoMdArrowDropdown size={20} />
            <img
              alt="avtar-img"
              src={userData.avatar?.original}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-[50%] object-cover"
            />
            <p className={`font-bold`}>{userData?.name}</p>
          </div>
          <ul
            className={`absolute bottom-[-70px] ${
              i18n.language === "ar" ? "right-0" : "left-0"
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
                  navigate("/dashboard");
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

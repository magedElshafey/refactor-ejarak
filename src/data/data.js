// navbar assets
import { BsFillHouseLockFill, BsBuildingFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { t } from "i18next";
import google from "../assets/google.png";
import app from "../assets/app.png";
import huwawy from "../assets/huwawy.png";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTiktok,
  FaSnapchatGhost,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const navLinks = [
  {
    arTitle: "اعلن عن عقارك",
    enTitle: "Advertise",
    path: "/addreal/step1",
    icon: <BsFillHouseLockFill size={20} />,
    onClick: (e, isLoggedIn, navigate, setActiveLink, type) => {
      if (!isLoggedIn) {
        e.preventDefault();
        setActiveLink(null);
        Swal.fire({
          text: t("login_first"),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: t("login"),
          cancelButtonText: t("cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          } else {
            return;
          }
        });
      } else if (type === "tenant") {
        e.preventDefault();
        setActiveLink(null);
        Swal.fire({
          icon: "error",
          position: "center",
          title: "يرجي تسجيل حساب مالك أولا",
        });
      }
    },
  },
  {
    arTitle: "العقارات المفضلة",
    enTitle: "WishList",
    path: "/website/wishlist",
    icon: <FaHeart size={20} />,
    onClick: (e, isLoggedIn, navigate, setActiveLink) => {
      if (!isLoggedIn) {
        e.preventDefault();
        setActiveLink(null);
        Swal.fire({
          text: t("login_first"),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: t("login"),
          cancelButtonText: t("cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          } else {
            return;
          }
        });
      } else {
        navigate("/wishlist");
      }
    },
  },
  {
    arTitle: " العقارات القريبة",
    enTitle: "near realstate",
    path: "/website/near-realstates",
    icon: <BsBuildingFill size={20} />,
  },
  {
    arTitle: "جميع العقارات",
    enTitle: "All realstate",
    path: "/website/all-realstates",
    icon: <BsBuildingFill size={20} />,
  },
];
export const numbers = [
  { number: "1", id: 1 },
  { number: "2", id: 2 },
  { number: "3", id: 3 },
  { number: "4", id: 4 },
  { number: "+5", id: 5 },
];
export const appDetails = {
  title: "download application",
  details: [
    {
      img: google,
      path: "https://www.google.com",
    },
    {
      img: huwawy,
      path: "https://www.instagram.com",
    },
    {
      img: app,
      path: "https://www.facebook.com",
    },
  ],
};

export const aboutUs = [
  {
    title: "contact us",
    path: "/website/chat",
  },
  {
    title: "privacy Policy",
    path: "/website/privacy",
  },
  {
    title: "termsAndConditions",
    path: "/website/terms-conditions",
  },
];
export const myAccount = [
  {
    title: "account details",
    path: "/website/my-account",
  },
  {
    title: "my houses",
    path: "/website/my-realstates",
  },
  {
    title: "my reservations",
    path: "/website/my-reservations",
  },
];
export const followUs = {
  title: "follow us",
  details: [
    {
      path: "https://www.facebook.com",
      icon: <FaFacebook size={20} />,
    },
    {
      path: "https://www.instagram.com",
      icon: <FaInstagramSquare size={20} />,
    },
    {
      path: "https://www.tiktok.com",
      icon: <FaTiktok size={20} />,
    },
    {
      path: "https://www.snapchat.com",
      icon: <FaSnapchatGhost size={20} />,
    },
    {
      path: "https://www.x.com",
      icon: <FaXTwitter size={20} />,
    },
  ],
};

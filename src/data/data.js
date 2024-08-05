// navbar assets
import {
  BsFillHouseLockFill,
  BsBuildingFill,
  BsFillHousesFill,
} from "react-icons/bs";
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
import { MdOutlineDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { TbBrandBooking, TbInfoTriangle } from "react-icons/tb";
import { GoPackage } from "react-icons/go";
import { LiaFileContractSolid } from "react-icons/lia";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { IoSettings } from "react-icons/io5";

export const navLinks = [
  {
    arTitle: "اعلن عن عقارك",
    enTitle: "Advertise",
    path: "/website/add-realstate",
    icon: <BsFillHouseLockFill size={20} />,
    onClick: (e, isLoggedIn, navigate, type) => {
      if (!isLoggedIn) {
        e.preventDefault();

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
            navigate("/auth/login");
          } else {
            return;
          }
        });
      } else if (type === "tenant") {
        e.preventDefault();

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
            navigate("/auth/login");
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
  {
    title: "about us",
    path: "/website/about-us",
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
export const accountDetailsNavbar = [
  {
    title: "my account",
    path: "/website/my-account",
    role: ["owner", "tenant"],
  },
  {
    title: "my houses",
    path: "/website/my-realstates",
    role: ["owner"],
  },
  {
    title: "my reservations",
    path: "/website/my-reservations",
    role: ["owner", "tenant"],
  },
  {
    title: "contracts",
    path: "/website/my-contracts",
    role: ["owner", "tenant"],
  },
];
export const statusFilter = [
  {
    arTitle: "العقارات قيد المراجعة",
    enTitle: "Under Review",
    value: "pending",
  },
  {
    arTitle: "العقارات المقبولة",
    enTitle: "Acceptable",
    value: "accepted",
  },

  {
    arTitle: "العقارات المرفوضة",
    enTitle: "Rejected",
    value: "refused",
  },
];
export const filterdReservations = [
  {
    arTitle: "الحجوزات قيد المراجعة",
    enTitle: "Under Review",
    value: "pending",
  },
  {
    arTitle: "الحجوزات المقبولة",
    enTitle: "Acceptable",
    value: "accepted",
  },

  {
    arTitle: "الحجوزات المرفوضة",
    enTitle: "Rejected",
    value: "refused",
  },
  {
    arTitle: "الحجوزات المكتملة",
    enTitle: "completed reservations",
    value: "contract_created",
  },
];
export const filterdContrancts = [
  {
    arTitle: "العقود اليدوية",
    enTitle: "manual contract",
    value: "manual",
  },
  {
    arTitle: "العقود الإلكترونية",
    enTitle: "electronic contracts",
    value: "electronic_agent",
  },
];
export const elevatorsAr = [
  {
    id: 1,
    name: "يوجد",
  },
  {
    id: 0,
    name: "لا يوجد",
  },
];
export const elevatorsEn = [
  {
    id: 1,
    name: "founded",
  },
  {
    id: 0,
    name: "not founded",
  },
];
export const dashboardLinks = [
  {
    icon: <MdOutlineDashboard size={20} />,
    title: "dashboard",
    path: "/dashboard",
    list: [],
  },
  {
    icon: <BsFillHousesFill size={20} />,
    path: "realstates",
    title: "realstates",
    list: [],
  },
  {
    icon: <FaUsers size={20} />,
    path: "users",
    title: "users",
    list: [],
  },
  {
    icon: <TbBrandBooking size={20} />,
    path: "reservations",
    title: "reservations",
    list: [],
  },
  {
    icon: <TbInfoTriangle size={20} />,
    path: "reports",
    title: "reports",
    list: [],
  },
  {
    icon: <GoPackage size={20} />,
    path: "packages",
    title: "packages",
    list: [],
  },
  {
    icon: <LiaFileContractSolid size={20} />,
    path: "contracts",
    title: "contracts",
    list: [
      {
        title: "manual contracts",
        path: "manual-contracts",
      },
      {
        title: "electronic contracts",
        path: "electronic-contracts",
      },
    ],
  },
  {
    icon: <HiOutlineNewspaper size={20} />,
    path: "website-content",
    title: "website content",
    list: [
      {
        path: "about-ejarak",
        title: "about ejarak",
      },
      {
        path: "terms-conditions",
        title: "terms and conditions",
      },
      {
        path: "faqs",
        title: "faqs",
      },
      {
        path: "privacy-policy",
        title: "privacy and policy",
      },
    ],
  },
  {
    icon: <IoSettings size={20} />,
    title: "settings",
    path: "settings",
    list: [
      {
        path: "realstate-types",
        title: "realstates types",
      },
      {
        path: "realstate-places",
        title: "realstates-places",
      },
      {
        path: "payment-period",
        title: "payment period",
      },
    ],
  },
];

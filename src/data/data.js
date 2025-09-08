// navbar assets
import {
  BsFillHouseLockFill,
  BsBuildingFill,
  BsFillHousesFill,
  BsBorderStyle,
} from "react-icons/bs";
import Swal from "sweetalert2";
import { t } from "i18next";
import google from "../assets/google.png";
import app from "../assets/app.png";
import { FaHeart, FaNewspaper, FaQuestion } from "react-icons/fa";
import {
  MdOutlineDashboard,
  MdOutlineRoundaboutLeft,
  MdPayments,
  MdReport,
  MdOutlinePayment,
  MdOutlinePayments,
} from "react-icons/md";
import { FaUsers, FaCity } from "react-icons/fa6";
import {
  TbBrandBooking,
  TbInfoTriangle,
  TbAirConditioning,
} from "react-icons/tb";
import { GoPackage } from "react-icons/go";
import { LiaFileContractSolid } from "react-icons/lia";
import { VscSettings } from "react-icons/vsc";
import { IoSettings } from "react-icons/io5";
import { PiPackageFill } from "react-icons/pi";
import { BiSolidCategory } from "react-icons/bi";
import { SiGooglepubsub } from "react-icons/si";
import { RiFileCloseFill } from "react-icons/ri";
import { FaMessage } from "react-icons/fa6";
import { FaFirstOrder } from "react-icons/fa6";

export const navLinks = [
  {
    arTitle: " العقارات القريبة",
    enTitle: "near realstate",
    path: "/website/near-realstates",
    icon: <BsBuildingFill size={20} />,
    role: ["owner", "tenant", "super_admin", "customer_service", "admin"],
    needLogin: false,
  },
  {
    arTitle: "جميع العقارات",
    enTitle: "All realstate",
    path: "/website/all-realstates",
    icon: <BsBuildingFill size={20} />,
    role: ["owner", "tenant", "super_admin", "customer_service", "admin"],
    needLogin: false,
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
        navigate("/website/wishlist");
      }
    },
    role: ["owner", "tenant", "super_admin", "customer_service", "admin"],
    needLogin: false,
  },
  {
    arTitle: "اعلن عن عقارك",
    enTitle: "Advertise",
    path: "/website/add-realstate",
    icon: <BsFillHouseLockFill size={20} />,
    onClick: (e, isLoggedIn, navigate, type) => {
      if (!isLoggedIn) {
        e.preventDefault();
        Swal.fire({
          title: t(
            "you need to login as a realstate owner or as a super admin"
          ),
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
      } else if (
        type !== "owner" &&
        type !== "super_admin" &&
        type !== "admin"
      ) {
        e.preventDefault();
        Swal.fire({
          icon: "error",
          position: "center",
          title: t(
            "you need to login as a realstate owner or as a super admin"
          ),
        });
      }
    },
    role: ["owner", "super_admin", "admin"],
    needLogin: true,
  },
  {
    arTitle: "الباقات",
    enTitle: "packages",
    path: "/website/packages",
    icon: <PiPackageFill size={20} />,
    onClick: (e, isLoggedIn, navigate, type) => {
      if (!isLoggedIn) {
        e.preventDefault();
        Swal.fire({
          title: t("you need to login as a realstate owner"),
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
      } else if (type !== "owner") {
        e.preventDefault();
        Swal.fire({
          icon: "error",
          position: "center",
          title: t("you need to login as a realstate owner"),
        });
      }
    },
    role: ["owner"],
    needLogin: true,
  },
  {
    arTitle: "طلباتي",
    enTitle: "my orders",
    path: "/website/my-reservations",
    icon: <BsBorderStyle size={20} />,
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
        navigate("/website/my-reservations");
      }
    },
    role: ["owner", "tenant", "super_admin", "admin"],
    needLogin: true,
  },
];
export const numbers = [
  { number: "1", id: 1 },
  { number: "2", id: 2 },
  { number: "3", id: 3 },
  { number: "4", id: 4 },
  { number: "+5", id: 5 },
];
export const numbersWithZero = [
  { number: "0", id: 0 },
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
      path: "https://play.google.com/store/apps/details?id=com.ejarksa.leasing",
    },

    {
      img: app,
      path: "https://apps.apple.com/eg/app/ejark-%D8%A5%D9%8A%D8%AC%D8%A7%D8%B1%D9%83/id6654921635",
    },
  ],
};

export const aboutUs = [
  {
    title: "contact us",
    path: "/website/chat",
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
      }
    },
  },
  // {
  //   title: "privacy Policy",
  //   path: "/website/privacy",
  // },
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

export const accountDetailsNavbar = [
  {
    title: "my account",
    path: "/website/my-account",
    role: ["owner", "tenant", "super_admin", "admin", "customer_service"],
  },
  {
    title: "my houses",
    path: "/website/my-realstates",
    role: ["owner", "super_admin", "admin"],
  },
  // {
  //   title: "my reservations",
  //   path: "/website/my-reservations",
  //   role: ["owner", "tenant"],
  // },
  // {
  //   title: "contracts",
  //   path: "/website/my-contracts",
  //   role: ["owner", "tenant"],
  // },
  // {
  //   title: "my orders",
  //   path: "/website/my-orders",
  //   role: ["owner", "tenant"],
  // },
];
export const myOrdersDetailsNavbar = [
  {
    title: "my reservations",
    path: "/website/my-reservations",
    role: ["owner", "tenant", "super_admin", "admin"],
  },
  {
    title: "contracts",
    path: "/website/my-contracts",
    role: ["owner", "tenant", "super_admin", "admin"],
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
  {
    arTitle: "العقارات المحذوفة",
    enTitle: "deleted",
    value: "deleted",
  },
];
export const statusFilterDashboardEn = [
  {
    id: "",
    name: "all",
  },
  {
    id: "pending",
    name: "pending",
  },
  {
    id: "accepted",
    name: "accepted",
  },
  {
    id: "refused",
    name: "refused",
  },
];
export const statusFilterDashboardAr = [
  {
    id: "",
    name: "عرض الكل",
  },
  {
    id: "pending",
    name: "قيد المراجعة",
  },
  {
    id: "accepted",
    name: "العقارات المقبولة",
  },
  {
    id: "refused",
    name: "العقارات المرفوضة",
  },
];
export const filterdReservations = [
  {
    arTitle: "الحجوزات قيد المراجعة",
    enTitle: "Under Review",
    value: "pending",
  },

  {
    arTitle: "الحجوزات المرفوضة",
    enTitle: "Rejected",
    value: "refused",
  },
  {
    arTitle: "الحجوزات المكتملة",
    enTitle: "completed reservations",
    value: "completed",
  },
];
export const filterdReservationDashboardAr = [
  {
    id: "",
    name: "عرض الكل",
  },
  {
    name: "الحجوزات قيد المراجعة",
    id: "pending",
  },
  {
    name: "الحجوزات المقبولة",
    id: "accepted",
  },
  {
    name: "الحجوزات المرفوضة",
    id: "refused",
  },
  {
    name: "الحجوزات المكتملة",
    id: "contract_created",
  },
];
export const filterdReservationDashboardEn = [
  {
    id: "",
    name: "all",
  },
  {
    name: "Under Review",
    id: "pending",
  },
  {
    name: "Acceptable",
    id: "accepted",
  },
  {
    name: "Rejected",
    id: "refused",
  },
  {
    name: "completed reservations",
    id: "contract_created",
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
    path: "dashboard",
    list: [],
    role: ["admin", "super_admin", "customer_service"],
  },
  {
    icon: <BsFillHousesFill size={20} />,
    path: "realstates",
    title: "realstates",
    list: [],
    role: ["admin", "super_admin"],
  },
  {
    path: "track-status",
    title: "track status",
    icon: <VscSettings size={20} />,
    role: ["admin", "super_admin"],
    list: [],
  },
  {
    icon: <FaUsers size={20} />,
    path: "users",
    title: "users",
    list: [],
    role: ["admin", "super_admin"],
  },
  {
    icon: <TbBrandBooking size={20} />,
    path: "reservations",
    title: "reservations",
    list: [],
    role: ["admin", "super_admin"],
  },
  {
    icon: <TbInfoTriangle size={20} />,
    path: "reports",
    title: "reports",
    list: [],
    role: ["admin", "super_admin"],
  },
  {
    icon: <GoPackage size={20} />,
    path: "packages",
    title: "packages",
    list: [],
    role: ["admin", "super_admin"],
  },
  {
    title: "contracts",
    icon: <FaNewspaper size={20} />,
    role: ["admin", "super_admin"],
    path: "contracts",
    list: [
      {
        path: "manual-contracts",
        icon: <FaNewspaper size={20} />,
        title: "manual contracts",
      },
      {
        title: "electronic contracts",
        path: "electronic-contracts",
        icon: <LiaFileContractSolid size={20} />,
      },
    ],
  },
  {
    path: "static-pages",
    title: "static pages settings",
    icon: <VscSettings size={20} />,
    role: ["admin", "super_admin"],
    list: [
      {
        path: "about-ejarak",
        title: "about ejarak",
        icon: <MdOutlineRoundaboutLeft size={20} />,
      },
      {
        path: "faqs",
        title: "faqs",
        icon: <FaQuestion size={20} />,
      },
      {
        path: "terms-conditions",
        title: "terms and conditions",
        icon: <TbAirConditioning size={20} />,
      },
    ],
  },
  {
    title: "real state settings",
    icon: <IoSettings size={20} />,
    path: "real-state-settings",
    role: ["admin", "super_admin"],
    list: [
      {
        icon: <FaCity size={20} />,
        title: "cities",
        path: "cities",
      },
      {
        icon: <BiSolidCategory size={20} />,
        title: "realstate types",
        path: "reaalstate-categories",
      },
      {
        icon: <SiGooglepubsub size={20} />,
        title: "unit types",
        path: "reaalstate-sub-categories",
      },
      {
        icon: <MdPayments size={20} />,
        title: "payment types",
        path: "payments",
      },
      {
        icon: <MdReport size={20} />,
        title: "report reasons",
        path: "report-reasons",
      },
      {
        icon: <RiFileCloseFill size={20} />,
        title: "booking refused reasons",
        path: "booking-reasons",
      },
    ],
  },
  {
    title: "chat",
    icon: <FaMessage size={20} />,
    path: "/website/chat/",
    role: ["admin", "super_admin", "customer_service"],
    list: [],
  },
  {
    title: "my orders",
    icon: <FaFirstOrder size={20} />,
    path: "/website/my-reservations",
    role: ["admin", "super_admin"],
    list: [],
  },
  {
    title: "contracts payments",
    icon: <MdOutlinePayments size={20} />,
    path: "/dashboard/contracts-payments",
    role: ["admin", "super_admin"],
    list: [],
  },
  {
    title: "application payments",
    icon: <MdOutlinePayment size={20} />,
    path: "/dashboard/application-payments",
    role: ["admin", "super_admin"],
    list: [],
  },
];
export const tableStatus = [
  {
    arTitle: " قيد المراجعة",
    enTitle: "Under Review",
    value: "pending",
  },
  {
    arTitle: "مقبول",
    enTitle: "Acceptable",
    value: "accepted",
  },

  {
    arTitle: "مرفوض",
    enTitle: "Rejected",
    value: "refused",
  },
];
export const furnishedOptionsAr = [
  {
    name: "نعم",
    id: 1,
  },
  {
    name: "لا",
    id: 0,
  },
];
export const furnishedOptionsEn = [
  {
    name: "yes",
    id: 1,
  },
  {
    name: "no",
    id: 0,
  },
];
export const parkingTypeAr = [
  {
    id: 0,
    name: "بدروم",
  },
  {
    id: 1,
    name: "أمامي",
  },
];
export const parkingTypeEn = [
  {
    id: 0,
    name: "basement",
  },
  {
    id: 1,
    name: "front",
  },
];
export const footerDetails = [
  {
    path: "website/my-account",
    title: "my account",
    role: ["owner", "tenant"],
  },
  {
    path: "website/my-reservations",
    title: "my orders",
    role: ["owner", "tenant"],
  },
];

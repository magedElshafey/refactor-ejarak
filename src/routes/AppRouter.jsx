import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts

// common components
import ScrollToTopAfterChangePage from "../components/App/ScrollToTopAfterChangePage";
// hooks
import useNetworkStatus from "../hooks/useNetworkStatus";
// pages
import Home from "../pages/website/Home";
import ErrorPage from "../pages/errors/ErrorPage";
import OfflineNerwork from "../pages/errors/OfflineNerwork";
import NearRealstates from "../pages/website/NearRealstates";
import HomeLayout from "../templates/home/HomeLayout";
import WebsiteLayout from "../templates/website/WebsiteLayout";
import AllRealStates from "../pages/website/AllRealStates";
import Whishlist from "../pages/website/Whishlist";
// authentication
import AuthLayout from "../templates/auth/AuthLayout";
import Login from "../pages/auth/Login";
import Regester from "../pages/auth/Regester";
import EmailVerfication from "../pages/auth/EmailVerfication";
import AddRealstate from "../pages/website/AddRealstate";
import MyAccount from "../pages/website/MyAccount";
import MyRealStates from "../pages/website/MyRealStates";
import MyReservations from "../pages/website/MyReservations";
import MyContracts from "../pages/website/MyContracts";
import RealStateReservation from "../pages/website/RealStateReservation";
import ReservationDetails from "../pages/website/ReservationDetails";
import CreateManualContract from "../pages/website/CreateManualContract";
import ManualContractDetails from "../pages/website/ManualContractDetails";
import CreateElectronicContract from "../pages/website/CreateElectronicContract";
import EditRealstate from "../pages/website/EditRealstate";
import DashboardLayout from "../templates/dashboard/DashboardLayout";
import AllNotfications from "../pages/website/AllNotfications";
import Privacy from "../pages/website/Privacy";
import Terms from "../pages/website/Terms";
import About from "../pages/website/About";
import RealstateDetails from "../pages/website/RealstateDetails";
import RealstateOwnerDetails from "../pages/website/RealstateOwnerDetails";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ForgetPasswordCode from "../pages/auth/ForgetPasswordCode";
import NewPassword from "../pages/auth/NewPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import Chat from "../pages/website/Chat";
import Realstates from "../pages/dashboard/Realstates";
import AboutEjarak from "../pages/dashboard/AboutEjarak";
import TermsAndConditions from "../pages/dashboard/TermsAndConditions";
import PrivacyAndPolicy from "../pages/dashboard/PrivacyAndPolicy";
import Faqs from "../pages/dashboard/Faqs";
import AddFaq from "../pages/dashboard/AddFaq";
import EditFaq from "../pages/dashboard/EditFaq";
import FAQ from "../pages/dashboard/FAQ";
import Cities from "../pages/dashboard/Cities";
import Packages from "../pages/dashboard/packages/Packages";
import AddPackage from "../pages/dashboard/packages/AddPackage";
import PackageDetails from "../pages/dashboard/packages/PackageDetails";
import EditPackage from "../pages/dashboard/packages/EditPackage";
import Reports from "../pages/dashboard/reports/Reports";
import ReportDetails from "../pages/dashboard/reports/ReportDetails";
import ManualContracts from "../pages/dashboard/contracts/manual/ManualContracts";
import ElectronicContracts from "../pages/dashboard/contracts/electronic/ElectronicContracts";
import Users from "../pages/dashboard/users/Users";
import AddUser from "../pages/dashboard/users/AddUser";
import UserDetails from "../pages/dashboard/users/UserDetails";
import EditUser from "../pages/dashboard/users/EditUser";
import Reservations from "../pages/dashboard/reservations/Reservations";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/website",
    errorElement: <ErrorPage />,
    element: <WebsiteLayout />,
    children: [
      {
        path: "near-realstates",
        element: <NearRealstates />,
      },
      {
        path: "all-realstates",
        element: <AllRealStates />,
      },
      {
        path: "wishlist",
        element: <Whishlist />,
      },
      {
        path: "add-realstate",
        element: <AddRealstate />,
      },
      {
        path: "edit-realstate/:id",
        element: <EditRealstate />,
      },
      {
        path: "my-account",
        element: <MyAccount />,
      },
      {
        path: "my-realstates",
        element: <MyRealStates />,
      },
      {
        path: "my-reservations",
        element: <MyReservations />,
      },
      {
        path: "my-contracts",
        element: <MyContracts />,
      },
      {
        path: "realstate/reservation-details/:id",
        element: <RealStateReservation />,
      },
      {
        path: "reservation-details/:id",
        element: <ReservationDetails />,
      },
      {
        path: "create-contract/manual/:id",
        element: <CreateManualContract />,
      },
      {
        path: "manual-contract/details/:id",
        element: <ManualContractDetails />,
      },
      {
        path: "create-contract/electronic/:id",
        element: <CreateElectronicContract />,
      },
      {
        path: "all-notfications",
        element: <AllNotfications />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "terms-conditions",
        element: <Terms />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "realstate/:id",
        element: <RealstateDetails />,
      },
      {
        path: "realstate-owner/:id",
        element: <RealstateOwnerDetails />,
      },
      {
        path: "chat/",
        element: <Chat />,
      },
      {
        path: "chat/:id",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "regester",
        element: <Regester />,
      },
      {
        path: "email-verfication",
        element: <EmailVerfication />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "forget-password-code",
        element: <ForgetPasswordCode />,
      },
      {
        path: "new-password",
        element: <NewPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        index: true,
      },
      {
        path: "realstates",
        element: <Realstates />,
      },
      {
        path: "realstate/:id",
        element: <RealstateDetails />,
      },
      {
        path: "about-ejarak",
        element: <AboutEjarak />,
      },
      {
        path: "terms-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyAndPolicy />,
      },
      {
        path: "faqs",
        element: <Faqs />,
      },
      {
        path: "faqs/add",
        element: <AddFaq />,
      },
      {
        path: "faqs/edit/:id",
        element: <EditFaq />,
      },
      {
        path: "faq-details/:id",
        element: <FAQ />,
      },
      {
        path: "cities",
        element: <Cities />,
      },
      {
        path: "packages",
        element: <Packages />,
      },
      {
        path: "add-package",
        element: <AddPackage />,
      },
      {
        path: "package-details/:id",
        element: <PackageDetails />,
      },
      {
        path: "edit-package/:id",
        element: <EditPackage />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "report-details/:id",
        element: <ReportDetails />,
      },
      {
        path: "manual-contracts",
        element: <ManualContracts />,
      },
      {
        path: "manual-contracts-details/:id",
        element: <ManualContractDetails />,
      },
      {
        path: "electronic-contracts",
        element: <ElectronicContracts />,
      },
      {
        path: "electronic-contracts-details/:id",
        element: <ReservationDetails />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-user",
        element: <AddUser />,
      },
      {
        path: "user-details/:id",
        element: <UserDetails />,
      },
      {
        path: "edit-user/:id",
        element: <EditUser />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
      {
        path: "reservation-details/:id",
        element: <ReservationDetails />,
      },
    ],
  },
]);

const AppRouter = () => {
  const { isOnline } = useNetworkStatus();
  return (
    <>
      {isOnline ? (
        <RouterProvider router={router}>
          <ScrollToTopAfterChangePage />
        </RouterProvider>
      ) : (
        <OfflineNerwork />
      )}
    </>
  );
};

export default AppRouter;

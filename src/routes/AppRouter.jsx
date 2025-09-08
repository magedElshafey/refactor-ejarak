import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Success from "../pages/website/Success";
import PaymentError from "../pages/website/PaymentError";
import ScrollToTopAfterChangePage from "../components/App/ScrollToTopAfterChangePage";
import Packagess from "../pages/website/Packagess";
import ReportReasons from "../pages/dashboard/ReportReasons";
import BookingReasons from "../pages/dashboard/BookingReasons";
import Categories from "../pages/dashboard/Categories";
import Payments from "../pages/dashboard/Payments";
import SubCategories from "../pages/dashboard/SubCategories";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedDashboard from "./ProtectedDashboard";
import ContractsPayments from "../pages/dashboard/transactions/ContractsPayments";
import ApplicationPayments from "../pages/dashboard/transactions/ApplicationPayments";
import TrackStatus from "../pages/dashboard/TrackStatus";
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
        element: (
          <ProtectedRoutes>
            <Whishlist />
          </ProtectedRoutes>
        ),
      },
      {
        path: "add-realstate",
        element: (
          <ProtectedRoutes>
            <AddRealstate />
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit-realstate/:id",
        element: (
          <ProtectedRoutes>
            <EditRealstate />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-account",
        element: (
          <ProtectedRoutes>
            <MyAccount />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-realstates",
        element: (
          <ProtectedRoutes>
            <MyRealStates />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-reservations",
        element: (
          <ProtectedRoutes>
            <MyReservations />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-contracts",
        element: (
          <ProtectedRoutes>
            <MyContracts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "realstate/reservation-details/:id",
        element: (
          <ProtectedRoutes>
            <RealStateReservation />
          </ProtectedRoutes>
        ),
      },
      {
        path: "reservation-details/:id",
        element: (
          <ProtectedRoutes>
            <ReservationDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "create-contract/manual/:id",
        element: (
          <ProtectedRoutes>
            <CreateManualContract />
          </ProtectedRoutes>
        ),
      },
      {
        path: "manual-contract/details/:id",
        element: (
          <ProtectedRoutes>
            <ManualContractDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "create-contract/electronic/:id",
        element: (
          <ProtectedRoutes>
            <CreateElectronicContract />
          </ProtectedRoutes>
        ),
      },
      {
        path: "all-notfications",
        element: (
          <ProtectedRoutes>
            <AllNotfications />
          </ProtectedRoutes>
        ),
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
        element: <RealstateDetails isDashboard={false} />,
      },
      {
        path: "realstate-owner/:id",
        element: <RealstateOwnerDetails />,
      },
      {
        path: "chat/",
        element: (
          <ProtectedRoutes>
            <Chat />
          </ProtectedRoutes>
        ),
      },
      {
        path: "chat/:id",
        element: (
          <ProtectedRoutes>
            <Chat />
          </ProtectedRoutes>
        ),
      },
      {
        path: "payment/success",
        element: (
          <ProtectedRoutes>
            <Success />
          </ProtectedRoutes>
        ),
      },
      {
        path: "payment/error",
        element: (
          <ProtectedRoutes>
            <PaymentError />
          </ProtectedRoutes>
        ),
      },
      {
        path: "packages",
        element: (
          <ProtectedRoutes>
            <Packagess />
          </ProtectedRoutes>
        ),
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
        element: (
          <ProtectedDashboard>
            <Dashboard />
          </ProtectedDashboard>
        ),
        index: true,
      },
      {
        path: "track-status",
        element: (
          <ProtectedDashboard>
            <TrackStatus />
          </ProtectedDashboard>
        ),
        index: true,
      },
      {
        path: "realstates",
        element: (
          <ProtectedDashboard>
            <Realstates />
          </ProtectedDashboard>
        ),
      },
      {
        path: "realstate/:id",
        element: <RealstateDetails isDashboard={true} />,
      },
      {
        path: "about-ejarak",
        element: (
          <ProtectedDashboard>
            <AboutEjarak />
          </ProtectedDashboard>
        ),
      },
      {
        path: "terms-conditions",
        element: (
          <ProtectedDashboard>
            <TermsAndConditions />
          </ProtectedDashboard>
        ),
      },
      {
        path: "privacy-policy",
        element: (
          <ProtectedDashboard>
            <PrivacyAndPolicy />
          </ProtectedDashboard>
        ),
      },
      {
        path: "faqs",
        element: (
          <ProtectedDashboard>
            <Faqs />
          </ProtectedDashboard>
        ),
      },
      {
        path: "faqs/add",
        element: (
          <ProtectedDashboard>
            <AddFaq />
          </ProtectedDashboard>
        ),
      },
      {
        path: "faqs/edit/:id",
        element: (
          <ProtectedDashboard>
            <EditFaq />
          </ProtectedDashboard>
        ),
      },
      {
        path: "faq-details/:id",
        element: (
          <ProtectedDashboard>
            <FAQ />
          </ProtectedDashboard>
        ),
      },
      {
        path: "cities",
        element: (
          <ProtectedDashboard>
            <Cities />
          </ProtectedDashboard>
        ),
      },
      {
        path: "packages",
        element: (
          <ProtectedDashboard>
            <Packages />
          </ProtectedDashboard>
        ),
      },
      {
        path: "add-package",
        element: (
          <ProtectedDashboard>
            <AddPackage />
          </ProtectedDashboard>
        ),
      },
      {
        path: "package-details/:id",
        element: (
          <ProtectedDashboard>
            <PackageDetails />
          </ProtectedDashboard>
        ),
      },
      {
        path: "edit-package/:id",
        element: (
          <ProtectedDashboard>
            <EditPackage />
          </ProtectedDashboard>
        ),
      },
      {
        path: "reports",
        element: (
          <ProtectedDashboard>
            <Reports />
          </ProtectedDashboard>
        ),
      },
      {
        path: "report-details/:id",
        element: (
          <ProtectedDashboard>
            <ReportDetails />
          </ProtectedDashboard>
        ),
      },
      {
        path: "manual-contracts",
        element: (
          <ProtectedDashboard>
            <ManualContracts />
          </ProtectedDashboard>
        ),
      },
      {
        path: "manual-contracts-details/:id",
        element: (
          <ProtectedDashboard>
            <ManualContractDetails />
          </ProtectedDashboard>
        ),
      },
      {
        path: "electronic-contracts",
        element: (
          <ProtectedDashboard>
            <ElectronicContracts />
          </ProtectedDashboard>
        ),
      },
      {
        path: "electronic-contracts-details/:id",
        element: (
          <ProtectedDashboard>
            <ReservationDetails />
          </ProtectedDashboard>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedDashboard>
            <Users />
          </ProtectedDashboard>
        ),
      },
      {
        path: "add-user",
        element: (
          <ProtectedDashboard>
            <AddUser />
          </ProtectedDashboard>
        ),
      },
      {
        path: "user-details/:id",
        element: (
          <ProtectedDashboard>
            <UserDetails />
          </ProtectedDashboard>
        ),
      },
      {
        path: "edit-user/:id",
        element: (
          <ProtectedDashboard>
            <EditUser />
          </ProtectedDashboard>
        ),
      },
      {
        path: "reservations",
        element: (
          <ProtectedDashboard>
            <Reservations />
          </ProtectedDashboard>
        ),
      },
      {
        path: "reservation-details/:id",
        element: (
          <ProtectedDashboard>
            <ReservationDetails />
          </ProtectedDashboard>
        ),
      },
      {
        path: "report-reasons",
        element: (
          <ProtectedDashboard>
            <ReportReasons />
          </ProtectedDashboard>
        ),
      },
      {
        path: "booking-reasons",
        element: (
          <ProtectedDashboard>
            <BookingReasons />
          </ProtectedDashboard>
        ),
      },
      {
        path: "reaalstate-categories",
        element: (
          <ProtectedDashboard>
            <Categories />
          </ProtectedDashboard>
        ),
      },
      {
        path: "reaalstate-sub-categories",
        element: (
          <ProtectedDashboard>
            <SubCategories />
          </ProtectedDashboard>
        ),
      },
      {
        path: "payments",
        element: (
          <ProtectedDashboard>
            <Payments />
          </ProtectedDashboard>
        ),
      },
      {
        path: "contracts-payments",
        element: (
          <ProtectedDashboard>
            <ContractsPayments />
          </ProtectedDashboard>
        ),
      },
      {
        path: "application-payments",
        element: (
          <ProtectedDashboard>
            <ApplicationPayments />
          </ProtectedDashboard>
        ),
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

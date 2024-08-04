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
import DashboardLayout from "../templates/dashboard/DashboardLayout";
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
    ],
  },
  {
    path: "/no-connection",
    element: <div>No Internet Connection</div>,
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    element: <DashboardLayout />,
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

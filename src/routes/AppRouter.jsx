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

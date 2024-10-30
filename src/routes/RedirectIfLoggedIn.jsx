import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const RedirectIfLoggedIn = ({ children }) => {
  const { ejarakLogin } = useSelector((state) => state.authSlice);
  if (ejarakLogin) {
    return <Navigate to="/website/my-account" />;
  }

  return children;
};

export default RedirectIfLoggedIn;

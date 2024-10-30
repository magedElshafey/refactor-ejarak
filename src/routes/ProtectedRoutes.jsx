import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const { ejarakLogin } = useSelector((state) => state.authSlice);
  if (!ejarakLogin) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default ProtectedRoutes;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getIsLoggedIn, getIsLoadingAuthUser } from "redux/auth/authSelectors";

const PrivateRoute = ({ component: Component, ...routeProps }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isLoadingAuthuser = useSelector(getIsLoadingAuthUser);
  const isRedirect = !isLoadingAuthuser && !isLoggedIn;

  return <>{isRedirect ? <Navigate to="/login" /> : <Component />}</>;
};

export default PrivateRoute;

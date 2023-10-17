import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getToken } from "redux/auth/authSelectors";

const PrivateRoute = ({ component: Component, ...routeProps }) => {
  const token = useSelector(getToken);
  const isRedirect = !token;

  return <>{isRedirect ? <Navigate to="/login" /> : <Component />}</>;
};

export default PrivateRoute;

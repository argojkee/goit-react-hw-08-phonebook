import { useAppSelector } from "../../../redux/hooks";
import { Navigate } from "react-router-dom";
import { getToken } from "redux/auth/authSelectors";

const PrivateRoute = ({ component: Component, ...routeProps }) => {
  const token = useAppSelector(getToken);
  console.log(token);
  const isRedirect = !token;

  return <>{isRedirect ? <Navigate to="/login" /> : <Component />}</>;
};

export default PrivateRoute;

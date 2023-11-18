import { useAppSelector } from "../../../redux/hooks";
import { Navigate } from "react-router-dom";
import { getToken } from "redux/auth/authSelectors";

const PublicRoute = ({ component: Component }) => {
  const token = useAppSelector(getToken);
  const state = useAppSelector(state => state);
  console.log(state);
  console.log(token);

  return <>{token ? <Navigate to="/contacts" /> : <Component />}</>;
};

export default PublicRoute;

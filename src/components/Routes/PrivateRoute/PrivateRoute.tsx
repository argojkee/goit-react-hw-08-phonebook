import { useAppSelector } from "../../../redux/hooks";
import { Navigate } from "react-router-dom";
import { getToken } from "redux/auth/authSelectors";

type Props = {
  component: React.ComponentType;
};

const PrivateRoute = ({ component: Component }: Props) => {
  const token = useAppSelector(getToken);
  const isRedirect = !token;

  return <>{isRedirect ? <Navigate to="/login" /> : <Component />}</>;
};

export default PrivateRoute;

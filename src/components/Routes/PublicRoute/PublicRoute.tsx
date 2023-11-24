import { useAppSelector } from "../../../redux/hooks";
import { Navigate } from "react-router-dom";
import { getToken } from "redux/auth/authSelectors";

type  Props = {
  component: React.ComponentType;
}

const PublicRoute = ({ component: Component }: Props) => {
  const token = useAppSelector(getToken);

  return <>{token ? <Navigate to="/contacts" /> : <Component />}</>;
};

export default PublicRoute;

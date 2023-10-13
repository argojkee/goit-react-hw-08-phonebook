import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getToken } from 'redux/auth/authSelectors';

const PublicRoute = ({ component: Component }) => {
  const token = useSelector(getToken);

  return <>{token ? <Navigate to="/contacts" /> : <Component />}</>;
};

export default PublicRoute;

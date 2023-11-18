import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "./Layout/Layout";
import { useAppSelector } from "../redux/hooks";
import { useEffect, lazy } from "react";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute/PublicRoute";
import { getToken } from "redux/auth/authSelectors";
import { useFetchCurrentUserMutation } from "redux/baseApi";

const ContactsPage = lazy(() => import("../pages/ContactsPage"));
const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));

export const App = () => {
  const token = useAppSelector(getToken);
  const [fetchCurrentUser, { isLoading: isLoadingAuthUser }] =
    useFetchCurrentUserMutation();

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    }
  }, [fetchCurrentUser, token]);

  return (
    !isLoadingAuthUser && (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="contacts"
            element={<PrivateRoute component={ContactsPage} />}
          />
          <Route
            path="register"
            element={<PublicRoute component={RegistrationPage} />}
          />
          <Route path="login" element={<PublicRoute component={LoginPage} />} />
        </Route>
      </Routes>
    )
  );
};

import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "./Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import operations from "redux/auth/authOperations";
import { useEffect, lazy } from "react";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute/PublicRoute";
import { getIsLoadingAuthUser } from "redux/auth/authSelectors";

const ContactsPage = lazy(() => import("../pages/ContactsPage"));
const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));

export const App = () => {
  const dispatch = useDispatch();
  const isLoadingAuthUser = useSelector(getIsLoadingAuthUser);

  useEffect(() => {
    dispatch(operations.fetchCurrentUser());
  }, [dispatch]);

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

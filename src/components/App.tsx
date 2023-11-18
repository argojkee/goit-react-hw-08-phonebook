import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "./Layout/Layout";
import { useAppSelector } from "../redux/hooks";
import { useEffect, lazy } from "react";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute/PublicRoute";
import { getToken } from "redux/auth/authSelectors";
import { useFetchCurrentUserMutation } from "redux/baseApi";
import { resetUser, setUser } from "redux/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";

const ContactsPage = lazy(() => import("../pages/ContactsPage"));
const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));

export const App = () => {
  const token = useAppSelector(getToken);
  const dispatch = useAppDispatch();
  const [fetchCurrentUser, { isLoading: isLoadingAuthUser }] =
    useFetchCurrentUserMutation();

  useEffect(() => {
    if (token) {
      fetchCurrentUser()
        .unwrap()
        .then(resp => {
          dispatch(
            setUser({
              user: resp,
              token,
            })
          );
        })
        .catch(err => {
          dispatch(resetUser());
        });
    }
  }, [dispatch, fetchCurrentUser, token]);

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

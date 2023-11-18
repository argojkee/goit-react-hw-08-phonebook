import AppBar from "../AppBar/AppBar";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { PiSpinnerGap } from "react-icons/pi";

const Layout = () => {
  return (
    <>
      <AppBar />
      <Suspense
        fallback={<PiSpinnerGap size={50} className="spinner main-spinner" />}
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;

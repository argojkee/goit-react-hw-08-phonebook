import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "redux/auth/authSelectors";
import { AiFillHome } from "react-icons/ai";
import { RiContactsBook2Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navigation = () => {
  const isLoggedin = useSelector(getIsLoggedIn);
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    if (pathname === "/") {
      setCurrentPage("home");
    } else if (pathname === "/contacts") {
      setCurrentPage("contacts");
    } else {
      setCurrentPage("");
    }
  }, [pathname]);

  return (
    <ul>
      <li>
        <NavLink
          to="/"
          className={`nav-link ${currentPage === "home" && "active"}`}
        >
          <AiFillHome size={24} />
          Home
        </NavLink>
      </li>
      {isLoggedin && (
        <li>
          <NavLink
            to="/contacts"
            className={`nav-link ${currentPage === "contacts" && "active"}`}
          >
            <RiContactsBook2Line size={24} />
            Contacts
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default Navigation;

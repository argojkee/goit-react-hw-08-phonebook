import { BiLogIn } from "react-icons/bi";
import { MdAppRegistration } from "react-icons/md";

import { NavLink } from "react-router-dom";

const AuthLinksList = () => {
  return (
    <ul className="auth-list">
      <li>
        <NavLink to="/register" className="auth-link">
          <MdAppRegistration size={24} />
          Registration
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className="auth-link">
          <BiLogIn size={24} />
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthLinksList;

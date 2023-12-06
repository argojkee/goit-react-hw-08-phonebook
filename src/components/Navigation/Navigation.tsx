import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { getToken } from "redux/auth/authSelectors";
import { AiFillHome } from "react-icons/ai";
import { RiContactsBook2Line } from "react-icons/ri";

const Navigation = () => {
  const token = useAppSelector(getToken);

  return (
    <ul className="nav-list">
      <li>
        <NavLink to="/" className={`nav-link`}>
          <AiFillHome size={24} />
          Home
        </NavLink>
      </li>
      {token && (
        <li>
          <NavLink to="/contacts" className={`nav-link `}>
            <RiContactsBook2Line size={24} />
            Contacts
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default Navigation;

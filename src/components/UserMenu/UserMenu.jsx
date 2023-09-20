import { getUserEmail, getIsPending } from "redux/auth/authSelectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import operations from "redux/auth/authOperations";
import { PiSpinnerGap } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { UserMenuStyle } from "./UserMenuStyle";

const UserMenu = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(getIsPending);
  const userEmail = useSelector(getUserEmail);

  const onLogOutClick = () => {
    dispatch(operations.logOut());
  };

  return (
    <UserMenuStyle className="user-menu-list">
      <li>
        <p className="user-email">{userEmail}</p>
      </li>
      <li>
        <button type="button" onClick={onLogOutClick}>
          {isPending ? (
            <PiSpinnerGap className="spinner" size={16} />
          ) : (
            <BiLogOut size={16} />
          )}
          Logout
        </button>
      </li>
    </UserMenuStyle>
  );
};

export default UserMenu;

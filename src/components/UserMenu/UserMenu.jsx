import { getUserEmail } from "redux/auth/authSelectors";
import { useAppSelector } from "../../redux/hooks";
import { PiSpinnerGap } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { UserMenuStyle } from "./UserMenuStyle";
import { useLogOutMutation } from "redux/baseApi";
import { toastSuccess } from "toastNotification/toastNotification";
import { resetToken, resetUser } from "../../redux/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const UserMenu = () => {
  const userEmail = useAppSelector(getUserEmail);
  const [logOut, { isLoading: isPending }] = useLogOutMutation();
  const dispatch = useAppDispatch();

  const onLogOutClick = async () => {
    const result = await logOut();

    dispatch(resetToken());
    dispatch(resetUser());

    if (!result.error) {
      toastSuccess("Log out successful. Come back sooner");
    }
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

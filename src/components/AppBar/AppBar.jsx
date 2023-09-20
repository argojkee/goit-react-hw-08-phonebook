import { useSelector } from "react-redux";
import { getIsLoggedIn } from "redux/auth/authSelectors";
import Navigation from "components/Navigation/Navigation";
import UserMenu from "components/UserMenu/UserMenu";
import AuthLinksList from "components/AuthLinksList/AuthLinksList";
import Container from "components/Container/Container";
import { AppBarStyle } from "./AppBarStyle.styled";

const AppBar = () => {
  const isLoggedin = useSelector(getIsLoggedIn);
  return (
    <AppBarStyle>
      <Container>
        <Navigation />
        {!isLoggedin && <AuthLinksList />}
        {isLoggedin && <UserMenu />}
      </Container>
    </AppBarStyle>
  );
};

export default AppBar;

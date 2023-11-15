import { useSelector } from "react-redux";
import { getToken } from "redux/auth/authSelectors";
import Navigation from "components/Navigation/Navigation";
import UserMenu from "components/UserMenu/UserMenu";
import AuthLinksList from "components/AuthLinksList/AuthLinksList";
import Container from "components/Container/Container";
import { AppBarStyle } from "./AppBarStyle.styled";

const AppBar = () => {
  const token: string = useSelector(getToken);
  return (
    <AppBarStyle>
      <Container>
        <Navigation />
        {!token && <AuthLinksList />}
        {token && <UserMenu />}
      </Container>
    </AppBarStyle>
  );
};

export default AppBar;

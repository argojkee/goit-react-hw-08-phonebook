import { useAppSelector } from "redux/hooks";
import { getUserName, getToken } from "redux/auth/authSelectors";
import Container from "components/Container/Container";
import { HomePageStyle } from "./pageStyles/HomePageStyle.styled";
import { Link } from "react-router-dom";

const HomePage = () => {
  const userName = useAppSelector(getUserName);
  const token = useAppSelector(getToken);

  return (
    <HomePageStyle>
      <Container>
        <h1>Contacts book</h1>
        {token ? (
          <h2>
            Hello <span className="name">{userName} </span>, enter to your{' '}
            <Link className="link" to="/contacts">
              contacts{' '}
            </Link>
            to find or create your contacts
          </h2>
        ) : (
          <h2>
            Please{' '}
            <Link className="link" to="register">
              register{' '}
            </Link>{' '}
            or{' '}
            <Link className="link" to="/login">
              login{' '}
            </Link>{' '}
            to see your contacts
          </h2>
        )}
      </Container>
    </HomePageStyle>
  );
};

export default HomePage;

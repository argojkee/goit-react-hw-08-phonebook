import Container from "components/Container/Container";
import RegistrationLoginForm from "components/RegistrationLoginForm/RegistrationLoginForm";
import { RegistrationLoginPageStyle } from "./pageStyles/RegistrationLoginPageStyle";

const RegistrationPage = () => {
  return (
    <RegistrationLoginPageStyle>
      <Container>
        <RegistrationLoginForm />
      </Container>
    </RegistrationLoginPageStyle>
  );
};

export default RegistrationPage;

import ContactList from "../components/FriendsList/ContactsList";
import SearchInput from "../components/SearchInput/SearchInput";
import AddContactForm from "../components/AddContactForm/AddContactForm";
import Container from "components/Container/Container";
import { ContactsPageStyle } from "./pageStyles/ContactsPageStyle.styled";

const ContactsPage = () => {
  return (
    <ContactsPageStyle>
      <Container>
        <AddContactForm />
        <SearchInput />
        <ContactList />
      </Container>
    </ContactsPageStyle>
  );
};

export default ContactsPage;

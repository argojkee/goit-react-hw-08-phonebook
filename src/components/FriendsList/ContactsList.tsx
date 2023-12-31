import ContactItem from "./ContactItem";
import { useAppSelector } from "../../redux/hooks";
import ContactsListStyled from "./ContactsListStyle.styled";
import { getFilter } from "redux/contacts/filterSlice";
import { useEffect, useState } from "react";
import EditContactModal from "components/EditContactModal/EditContactModal";
import { useCustomContext } from "context/userEditContext";
import MainSpinner from "./MainSpinner";
import { ContactsContainerStyle } from "./ContactsContainer.styled";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import { useFetchContactsQuery } from "../../redux/baseApi";
import { Contact } from "types";

const ContactList = () => {
  const filter = useAppSelector(getFilter);
  const context = useCustomContext();
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [currentItems, setCurrentItems] = useState<Contact[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const {
    data: contacts,
    isLoading: loading,
    isError: error,
  } = useFetchContactsQuery();

  useEffect(() => {
    setFilteredContacts(
      contacts
        ? [
            ...contacts
              .filter(
                contact =>
                  contact.name.toLowerCase().includes(filter.toLowerCase()) ||
                  contact.number.toLowerCase().includes(filter.toLowerCase())
              )
              .sort(({ name: firstName }, { name: secondName }) =>
                firstName.localeCompare(secondName)
              ),
          ]
        : []
    );
  }, [contacts, filter]);

  useEffect(() => {
    const paginationList = document.querySelector(
      ".pagination-list"
    ) as HTMLElement;
    const firstPage = paginationList?.firstElementChild
      .nextSibling as HTMLElement;
    const endOffset = itemOffset + itemsPerPage;

    if (endOffset === itemsPerPage) {
      firstPage?.classList.add("active");
    } else {
      firstPage?.classList.remove("active");
    }

    setCurrentItems(filteredContacts?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredContacts?.length / itemsPerPage));

    if (
      filteredContacts.length <=
        Math.ceil(filteredContacts?.length / itemsPerPage) * itemsPerPage &&
      itemOffset ===
        Math.ceil(filteredContacts?.length / itemsPerPage) * itemsPerPage
    ) {
      setItemOffset(0);
      firstPage?.classList.add("active");
    }
  }, [itemOffset, itemsPerPage, filteredContacts]);

  const handlePageClick = ({ selected }: { selected: number }): void => {
    const newOffset = (selected * itemsPerPage) % filteredContacts?.length;

    setItemOffset(newOffset);
  };

  if (error) {
    return (
      <ContactsContainerStyle>
        <h2 className="error">
          Sorry, something went wrong. Please, try again
        </h2>
        ;
      </ContactsContainerStyle>
    );
  }

  if (loading) {
    return (
      <ContactsContainerStyle>
        <MainSpinner />
      </ContactsContainerStyle>
    );
  }

  if (contacts?.length === 0) {
    return (
      <ContactsContainerStyle>
        <h2 className="notification">
          You haven't any contacts. Please add contacts to your phonebook
        </h2>
      </ContactsContainerStyle>
    );
  }

  if (filter && filteredContacts.length === 0) {
    return (
      <ContactsContainerStyle>
        <h2 className="notification">
          We didn't find any contacts according your search
        </h2>
      </ContactsContainerStyle>
    );
  }

  if (contacts?.length > 0) {
    return (
      <ContactsContainerStyle>
        <ContactsListStyled>
          {context.isShowModal && <EditContactModal />}
          {currentItems?.map(contact => (
            <ContactItem
              name={contact.name}
              number={contact.number}
              id={contact.id}
              key={contact.id}
            />
          ))}
        </ContactsListStyled>
        {filteredContacts.length > itemsPerPage && (
          <ReactPaginate
            className="pagination-list pagination"
            nextLabel={<GrFormNextLink size={16} />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={<GrFormPreviousLink size={16} />}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        )}
      </ContactsContainerStyle>
    );
  }
};

export default ContactList;

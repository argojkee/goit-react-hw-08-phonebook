import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getContactsList } from "redux/contacts/contactsSlice";
import { useAddContactMutation } from "redux/baseApi";
import { PiSpinnerGap } from "react-icons/pi";
import AddContactFormStyle from "./FormStyle.styled";
import { GrAdd } from "react-icons/gr";
import { toastSuccess, toastError } from "toastNotification/toastNotification";

const AddContactForm = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const contacts = useSelector(getContactsList);
  const [notify, setNotify] = useState("Please, enter contact info to add");
  const [canSubmit, setCanSubmit] = useState(false);
  const [addContact, { isLoading: isAdding }] = useAddContactMutation();
  const handlerChangeInput = ({ target }) => {
    if (target.name === "name") {
      setName(target.value);
    } else {
      setNumber(target.value);
    }
  };

  useEffect(() => {
    if (!name && !number) {
      setNotify("Please, enter contact name and number to add");
      setCanSubmit(false);
    } else if (name && name.length < 3) {
      setNotify("Contact name should be 3 symbols minimum");
      setCanSubmit(false);
    } else if (name && name.length > 16) {
      setNotify("Contact name should be 16 symbols maximum");
      setCanSubmit(false);
    } else if (name && !number) {
      setNotify("Please add contact number");
      setCanSubmit(false);
    } else if (name && number.length < 5) {
      setNotify("Contact number should be 5 symbols minimum");
      setCanSubmit(false);
    } else if (name && number.length > 16) {
      setNotify("Contact number should be 16 symbols maximum");
      setCanSubmit(false);
    } else if (number && !name) {
      setNotify("Please, enter contact name");
      setCanSubmit(false);
    } else {
      setNotify("You can add contact to your book");
      setCanSubmit(true);
    }
  }, [name, number]);

  const handlerSubmitForm = async e => {
    e.preventDefault();

    if (
      contacts?.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toastError(`${name} is already in your contacts`);

      return;
    } else if (
      contacts?.some(contact => contact.number.trim() === number.trim())
    ) {
      toastError(`The number ${number} is already in your contacts`);

      return;
    }
    if (canSubmit) {
      const result = await addContact({ name, number });
      if (result.error) {
        toastError(
          "Oops... Something went wrong =(. Please, reload page and try again"
        );
      } else {
        toastSuccess("Contact has been added to your book");
      }

      setName("");
      setNumber("");
    }
  };

  return (
    <AddContactFormStyle autoComplete="off" onSubmit={handlerSubmitForm}>
      <h2>
        <span className="first">Add </span>contact
      </h2>
      <div className="add-contact-label-container">
        <input
          id="add-name"
          placeholder="Name"
          value={name}
          onChange={handlerChangeInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="add-name">Name</label>
      </div>
      <div className="add-contact-label-container">
        <input
          id="add-number"
          placeholder="Number"
          value={number}
          onChange={handlerChangeInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <label htmlFor="add-number">Phone </label>
      </div>

      <button type="submit" disabled={!canSubmit}>
        {isAdding ? (
          <PiSpinnerGap className="spinner" size={16} />
        ) : (
          <GrAdd size={16} />
        )}
        Add contact
      </button>
      <p className={`notify ${canSubmit ? "ok" : "error"}`}>{notify}</p>
    </AddContactFormStyle>
  );
};

export default AddContactForm;

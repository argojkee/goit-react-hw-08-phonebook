import { useCustomContext } from "context/userEditContext";
import { useEffect, useState } from "react";
import { editContact } from "redux/contacts/contactsOperations";
import { useDispatch, useSelector } from "react-redux";
import { getContactsList, getIsEditing } from "redux/contacts/contactsSlice";
import { EditContactFormStyle } from "./EditContactFormStyle.styled";
import { FiEdit2 } from "react-icons/fi";
import { PiSpinner } from "react-icons/pi";

const EditContactForm = () => {
  const { name, number, id, isShowModal, setToggleShowModal } =
    useCustomContext();
  const [editName, setEditName] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");
  const contacts = useSelector(getContactsList);
  const editing = useSelector(getIsEditing);
  const [onSubmitClick, setOnSubmitClick] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setEditName(e.target.value);
    } else {
      setEditNumber(e.target.value);
    }
  };

  useEffect(() => {
    const checkedEditName = editName.toLowerCase().trim();
    const checkedEditNumber = editNumber.trim();
    const checkedName = name.toLowerCase().trim();
    const checkedNumber = number.trim();

    if (
      checkedEditName === checkedName &&
      editNumber.trim() === checkedNumber.trim()
    ) {
      setInvalidMessage(`Its current name and number`);
      setCanSubmit(false);
    } else if (
      (checkedEditName === checkedName && !checkedEditNumber) ||
      (checkedEditNumber === checkedNumber && !checkedEditName)
    ) {
      if (checkedEditName === checkedName && !checkedEditNumber) {
        setInvalidMessage(`You are alredy have this contact name in your book`);
      } else if (checkedEditNumber === checkedNumber && !checkedEditName) {
        setInvalidMessage(
          `You are alredy have this contact number in your book`
        );
      }
      setCanSubmit(false);
    } else if (checkedEditName && checkedEditName.length < 3) {
      setInvalidMessage("Name should be minimun 3 symbols");
      setCanSubmit(false);
    } else if (checkedEditNumber && checkedEditNumber.length < 5) {
      setInvalidMessage("Number should be minimun 5 symbols");
      setCanSubmit(false);
    } else if (!checkedEditNumber && !checkedEditName) {
      setInvalidMessage("Please edit something");
      setCanSubmit(false);
    } else if (
      contacts.some(
        ({ name, number, id: itemId }) =>
          (name.toLowerCase().trim() === checkedEditName ||
            number === checkedEditNumber) &&
          id !== itemId
      )
    ) {
      setInvalidMessage("You alredy have contact with this number or name");
      setCanSubmit(false);
    } else if (editName.length > 16) {
      setCanSubmit(false);
      setInvalidMessage("Contact name should be 16 symbols maximum");
    } else if (editNumber.length > 16) {
      setCanSubmit(false);
      setInvalidMessage("Contact number should be 16 symbols maximum");
    } else {
      setInvalidMessage("");
      setCanSubmit(true);
    }
  }, [contacts, editName, editNumber, id, name, number]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendingName = editName ? editName : name;
    const sendingNumber = editNumber ? editNumber : number;

    dispatch(editContact({ id, name: sendingName, number: sendingNumber }));
    setOnSubmitClick(true);
  };

  useEffect(() => {
    if (!editing && onSubmitClick) {
      setToggleShowModal(!isShowModal);
    }
  }, [editing, isShowModal, onSubmitClick, setToggleShowModal]);

  return (
    <EditContactFormStyle autoComplete="off" onSubmit={handleSubmit}>
      <div className="label-container">
        <input
          placeholder="Name"
          id="edit-name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          name="name"
          type="text"
          value={editName}
          onChange={handleChange}
        />
        <label htmlFor="edit-name">Name </label>
      </div>
      <div className="label-container">
        <input
          placeholder="Number"
          id="edit-number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          name="number"
          type="tel"
          value={editNumber}
          onChange={handleChange}
        />
        <label htmlFor="edit-number">Phone</label>
      </div>

      <button disabled={!canSubmit} type="submit">
        {editing ? (
          <PiSpinner className="spinner" size={16} />
        ) : (
          <FiEdit2 size={16} />
        )}
        Edit
      </button>
      <p className={invalidMessage ? "invalid" : "notify"}>
        {invalidMessage ? invalidMessage : "All good. You can edit contact"}
      </p>
    </EditContactFormStyle>
  );
};

export default EditContactForm;

import { useCustomContext } from 'context/userEditContext';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getContactsList } from 'redux/contacts/contactsSlice';
import { EditContactFormStyle } from './EditContactFormStyle.styled';
import { FiEdit2 } from 'react-icons/fi';
import { PiSpinner } from 'react-icons/pi';
import { useEditContactMutation } from 'redux/baseApi';
import { toastSuccess, toastError } from 'toastNotification/toastNotification';

const EditContactForm = () => {
  const { name, number, id, isShowModal, setToggleShowModal } =
    useCustomContext();
  const [editName, setEditName] = useState('');
  const [editNumber, setEditNumber] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState('');
  const contacts = useSelector(getContactsList);
  const [onSubmitClick, setOnSubmitClick] = useState(false);
  const [editContact, { isLoading: editing }] = useEditContactMutation();

  const handleChange = e => {
    if (e.target.name === 'name') {
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
      setInvalidMessage('Name should be minimun 3 symbols');
      setCanSubmit(false);
    } else if (checkedEditNumber && checkedEditNumber.length < 5) {
      setInvalidMessage('Number should be minimun 5 symbols');
      setCanSubmit(false);
    } else if (!checkedEditNumber && !checkedEditName) {
      setInvalidMessage('Please edit something');
      setCanSubmit(false);
    } else if (
      contacts.some(
        ({ name, number, id: itemId }) =>
          (name.toLowerCase().trim() === checkedEditName ||
            number === checkedEditNumber) &&
          id !== itemId
      )
    ) {
      setInvalidMessage('You alredy have contact with this number or name');
      setCanSubmit(false);
    } else if (editName.length > 16) {
      setCanSubmit(false);
      setInvalidMessage('Contact name should be 16 symbols maximum');
    } else if (editNumber.length > 16) {
      setCanSubmit(false);
      setInvalidMessage('Contact number should be 16 symbols maximum');
    } else {
      setInvalidMessage('');
      setCanSubmit(true);
    }
  }, [contacts, editName, editNumber, id, name, number]);

  const handleSubmit = async e => {
    e.preventDefault();
    const sendingName = editName ? editName : name;
    const sendingNumber = editNumber ? editNumber : number;

    const result = await editContact({
      id,
      name: sendingName,
      number: sendingNumber,
    });
    if (result.error) {
      toastError(
        'Oops... Something went wrong =(. Please, reload page and try again'
      );
    } else {
      toastSuccess('Contact has been edited. Thank you');
    }
    setOnSubmitClick(true);
    setToggleShowModal(!isShowModal);
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
      <p className={invalidMessage ? 'invalid' : 'notify'}>
        {invalidMessage ? invalidMessage : 'All good. You can edit contact'}
      </p>
    </EditContactFormStyle>
  );
};

export default EditContactForm;

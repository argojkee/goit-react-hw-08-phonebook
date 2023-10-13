import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { PiSpinnerGap } from 'react-icons/pi';
import { getDeleting } from 'redux/contacts/contactsSlice';
import { useState } from 'react';
import { useDeleteContactMutation } from 'redux/baseApi';
import { toastSuccess, toastError } from 'toastNotification/toastNotification';

const DeleteContactButton = ({ userId }) => {
  const Deleting = useSelector(getDeleting);
  const [isCurrentButton, setIsCurrentButton] = useState(false);
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async () => {
    setIsCurrentButton(true);
    const result = await deleteContact(userId);

    if (result.error) {
      toastError(
        'Oops... Something went wrong =(. Please, reload page and try again'
      );
    } else {
      toastSuccess('Contacts has been deleted from your book');
    }

    setIsCurrentButton(false);
  };

  return (
    <button
      disabled={Deleting}
      className="button-item delete"
      onClick={handleDelete}
    >
      {Deleting && isCurrentButton ? (
        <PiSpinnerGap className="spinner" size={24} />
      ) : (
        <RiDeleteBin6Line size={24} />
      )}
    </button>
  );
};

export default DeleteContactButton;

DeleteContactButton.propTypes = {
  userId: PropTypes.string.isRequired,
};

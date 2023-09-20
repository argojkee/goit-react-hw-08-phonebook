import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteContact } from 'redux/contacts/contactsOperations';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { PiSpinnerGap } from 'react-icons/pi';
import { getDeleting } from 'redux/contacts/contactsSlice';
import { useState } from 'react';

const DeleteContactButton = ({ userId }) => {
  const dispatch = useDispatch();
  const Deleting = useSelector(getDeleting);
  const [isCurrentButton, setIsCurrentButton] = useState(false);

  const handleDelete = e => {
    setIsCurrentButton(true);
    dispatch(deleteContact(userId)).finally(() => {
      setIsCurrentButton(false);
    });
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

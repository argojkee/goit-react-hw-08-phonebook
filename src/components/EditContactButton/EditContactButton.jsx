import { useCustomContext } from 'context/userEditContext';
import { FiEdit2 } from 'react-icons/fi';

const EditContactButton = ({ id, name, number }) => {
  const { setId, isShowModal, setToggleShowModal, setName, setNumber } =
    useCustomContext();

  const handleEditContact = () => {
    setId(id);
    setName(name);
    setNumber(number);
    setToggleShowModal(!isShowModal);
  };

  return (
    <button
      className="button-item edit"
      onClick={handleEditContact}
      type="button"
    >
      <FiEdit2 size={20} />
    </button>
  );
};

export default EditContactButton;
